import * as SQLite from 'expo-sqlite';

export interface Post {
  id: string;
  petName: string;
  petImage: string;
  ownerName: string;
  caption: string;
  hashtags: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
  timestamp: string;
}

export interface Comment {
  id: string;
  postId: string;
  userName: string;
  text: string;
  createdAt: string;
}

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initialize() {
    try {
      this.db = await SQLite.openDatabaseAsync('petshare.db');
      
      // Create posts table
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS posts (
          id TEXT PRIMARY KEY,
          petName TEXT NOT NULL,
          petImage TEXT NOT NULL,
          ownerName TEXT NOT NULL,
          caption TEXT,
          hashtags TEXT,
          likes INTEGER DEFAULT 0,
          comments INTEGER DEFAULT 0,
          isLiked INTEGER DEFAULT 0,
          createdAt TEXT NOT NULL,
          timestamp TEXT NOT NULL
        );
      `);

      // Create comments table
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS comments (
          id TEXT PRIMARY KEY,
          postId TEXT NOT NULL,
          userName TEXT NOT NULL,
          text TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
        );
      `);

      // Create likes table to track which posts are liked
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS likes (
          id TEXT PRIMARY KEY,
          postId TEXT NOT NULL,
          liked INTEGER DEFAULT 1,
          FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
        );
      `);

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }

  async getAllPosts(): Promise<Post[]> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      const result = await this.db!.getAllAsync<Post>(
        `SELECT * FROM posts ORDER BY createdAt DESC`,
        []
      );
      
      // Check if posts are liked
      const postsWithLikes = await Promise.all(
        result.map(async (post) => {
          const likeRecord = await this.db!.getFirstAsync<{ liked: number }>(
            `SELECT liked FROM likes WHERE postId = ?`,
            [post.id]
          );
          return {
            ...post,
            isLiked: likeRecord ? likeRecord.liked === 1 : false,
          };
        })
      );

      return postsWithLikes;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  async addPost(post: Post): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      await this.db!.runAsync(
        `INSERT INTO posts (id, petName, petImage, ownerName, caption, hashtags, likes, comments, isLiked, createdAt, timestamp)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          post.id,
          post.petName,
          post.petImage,
          post.ownerName,
          post.caption || '',
          post.hashtags || '',
          post.likes || 0,
          post.comments || 0,
          post.isLiked ? 1 : 0,
          post.createdAt,
          post.timestamp,
        ]
      );
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  }

  async toggleLike(postId: string, isLiked: boolean): Promise<number> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      // Update post likes count
      await this.db!.runAsync(
        `UPDATE posts SET likes = likes + ? WHERE id = ?`,
        [isLiked ? 1 : -1, postId]
      );

      // Update like record
      const existingLike = await this.db!.getFirstAsync<{ id: string }>(
        `SELECT id FROM likes WHERE postId = ?`,
        [postId]
      );

      if (existingLike) {
        await this.db!.runAsync(
          `UPDATE likes SET liked = ? WHERE postId = ?`,
          [isLiked ? 1 : 0, postId]
        );
      } else {
        await this.db!.runAsync(
          `INSERT INTO likes (id, postId, liked) VALUES (?, ?, ?)`,
          [`like_${postId}`, postId, isLiked ? 1 : 0]
        );
      }

      // Get updated likes count
      const result = await this.db!.getFirstAsync<{ likes: number }>(
        `SELECT likes FROM posts WHERE id = ?`,
        [postId]
      );

      return result?.likes || 0;
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }

  async getComments(postId: string): Promise<Comment[]> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      const result = await this.db!.getAllAsync<Comment>(
        `SELECT * FROM comments WHERE postId = ? ORDER BY createdAt DESC`,
        [postId]
      );
      return result;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  async addComment(comment: Comment): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      await this.db!.runAsync(
        `INSERT INTO comments (id, postId, userName, text, createdAt)
         VALUES (?, ?, ?, ?, ?)`,
        [comment.id, comment.postId, comment.userName, comment.text, comment.createdAt]
      );

      // Update post comments count
      await this.db!.runAsync(
        `UPDATE posts SET comments = comments + 1 WHERE id = ?`,
        [comment.postId]
      );
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  async deletePost(postId: string): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      await this.db!.runAsync(`DELETE FROM posts WHERE id = ?`, [postId]);
      await this.db!.runAsync(`DELETE FROM comments WHERE postId = ?`, [postId]);
      await this.db!.runAsync(`DELETE FROM likes WHERE postId = ?`, [postId]);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
}

export default new DatabaseService();


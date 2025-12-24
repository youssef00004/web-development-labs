const MOCK_SERVER_URL =
  "https://2ed0ede1-ed65-4a97-870c-896daa36b457.mock.pstmn.io";

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostDetails = async (postId) => {
  try {
    const postResponse = await fetch(`${MOCK_SERVER_URL}/posts/${postId}`);
    if (!postResponse.ok) {
      throw new Error(`Failed to fetch post: ${postResponse.status}`);
    }
    const postData = await postResponse.json();

    const commentsResponse = await fetch(`${MOCK_SERVER_URL}/posts/${postId}/comments`);
    if (!commentsResponse.ok) {
      throw new Error(`Failed to fetch comments: ${commentsResponse.status}`);
    }
    const commentsData = await commentsResponse.json();

    return { post: postData, comments: commentsData };
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
};

export const createNewPost = async (newPostData) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPostData)
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const createNewComment = async (postId, newCommentData) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCommentData)
    });
    if (!response.ok) {
      throw new Error(`Failed to create comment: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

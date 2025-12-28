module.exports = {
  post_created: process.env.POINT_POST || 30,
  post_liked: process.env.POINT_LIKE || 10,
  topic_created: process.env.POINT_COMMAND || 50
};

const config = {
    app: {
      port: process.env.PORT || 3000,
    },
    db: {
      uri: process.env.MONGODB_URI || `mongodb+srv://thanhduy4402:3JwuO60QGbfqktxY@cluster0.cl9atqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    },
    jwt: {
        key: "secretkey"
    }
  };
module.exports = config;
  
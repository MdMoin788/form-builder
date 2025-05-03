import "tsconfig-paths/register";
import app from "./App";
import logger from "./config/logger";

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
    isLive:"Api Made Live, Test the api now",
  })
})
app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
});

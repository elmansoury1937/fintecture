import * as express from 'express';

class Api {
  public app;
  private message: String = 'String response from server';

  constructor () {
    this.app = express();
    this.mountRoutes();
  }

  private mountRoutes (): void {
    const router = express.Router();
    router.get('/hello', (req, res) => {
      res.json({
        message: this.message
      });
    });

    module.exports = router;
  }
}

export default new Api().app;

import { Request, Response } from 'express';

class HelloWorldController {
  public helloWorld(req: Request, res: Response) {
    return res.status(200).json({ data: 'Hello World1a2a3' });
  }
}

export const helloWorldController = new HelloWorldController();

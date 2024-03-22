import Session from '../models/Session';

const sessionController = {
  getSessionById: async (req, res) => {
    const session = await Session.findById(req.params.id);
    res.json(session);
  },
  getSessionByUserId: async (req, res) => {
    const sessions = await Session.find({ user: req.params.userId });
    res.json(sessions);
  },
  createSession: async (req, res) => {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  },

  updateSession: async (req, res) => {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(session);
  },

  deleteSession: async (req, res) => {
    await Session.findByIdAndDelete(req.params.id);
    res.status(204).send();
  }
};

export default sessionController;
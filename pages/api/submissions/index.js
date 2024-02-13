import getSubmissions from '../../../services/getSubmissions';
import createOffer from '../../../services/create'


export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const submissions = await getSubmissions(4);
      res.status(200).json(submissions);

      break;
    }
    case 'POST': {
      try {


        const payload = req.body;
        const submission = await createOffer(payload);
        res.status(200).json({ status: 'created', submission });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};

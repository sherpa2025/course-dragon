import express from 'express';
import ClassDesc from './descriptionModel.js';

const router = express.Router();


// Create a new class description
export const addDescription =  (req, res) => {
    const newClassDesc = new ClassDesc({
      class: req.body.class,
      name: req.body.name,
      credits: req.body.credits,
      description: req.body.description,
      fulfills: req.body.fulfills,
      prereqs: req.body.prereqs
    });
  
    newClassDesc.save()
      .then(savedClassDesc => {
        res.json(savedClassDesc);
      })
      .catch(err => {
        console.error(`Error creating class description: ${err}`);
        res.status(500).send('Error creating class description.');
      });
  };
  
  export const getClassDescriptions = async (req, res) => {
    try {
      const classDescs = await ClassDesc.find();
      res.json(classDescs);
    } catch (error) {
      console.error(`Error getting class descriptions: ${error}`);
      res.status(500).json({ error: 'Error getting class descriptions' });
    }
  };
  
  export default router;
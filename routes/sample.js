const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const fs=require('fs');
// Read hospitals data from JSON file
const readHospitalsData = () => {
    const rawData = fs.readFileSync('data.json');
    return JSON.parse(rawData);
  };
  
 
const writeHospitalsData = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  };

// GET details of all hospitals
router.get('/details', (req, res) => {
    const hospitals = readHospitalsData();
    res.json(hospitals);
  });


  // GET details of specific hospital by index
router.get('/details/:index', (req, res) => {
    const hospitals = readHospitalsData();
    const index = req.params.index;
    if (index < hospitals.length) {
      res.json(hospitals[index]);
    } else {
      res.send('Hospital not found.');
    }
  });
  

  // POST  new hospital details
router.post('/newhospital', (req, res) => {
    const hospitals = readHospitalsData();
    const newHospital = req.body;
    hospitals.push(newHospital);
    writeHospitalsData(hospitals);
    res.send('Hospital added successfully.');
  });

  // PUT (update) a hospital by index
router.put('/hospitals/:index', (req, res) => {
    const hospitals = readHospitalsData();
    const index = req.params.index;
    if (index < hospitals.length) {
      hospitals[index] = req.body;
      writeHospitalsData(hospitals);
      res.send('Hospital updated successfully.');
    } else {
      res.send('Hospital not found.');
    }
  });
  

  // DELETE a hospital by index
router.delete('/hospitals/:index', (req, res) => {
    const hospitals = readHospitalsData();
    const index = req.params.index;
    if (index < hospitals.length) {
      hospitals.splice(index, 1);
      writeHospitalsData(hospitals);
      res.send('Hospital deleted successfully.');
    } else {
      res.send('Hospital not found.');
    }
  });


module.exports=router;
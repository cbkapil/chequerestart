import PartyData from "../../models/PartyModel.js";
import express from "express";
import auth from "../Auth.js"

const router = express.Router();

router.put("/updatecustomer/:id", auth, async (req, res) => {
  console.log("helloooooo", req.params.id);

  try {
    console.log(req.body.newData);

    await PartyData.findByIdAndUpdate(
      req.params.id,
      {
        
            partyname: req.body.newData.partyname,
            
            email:req.body.newData.email,
        
        
            city:req.body.newData.city,
           
          
            phonenumber:req.body.newData.phonenumber,
           
        
          
          
      },
      { new: true }
    );

    res.status(200).json({ message: "Firm Data added", status: true });
  } catch (err) {
    console.log(err);
  }
});

export default router;

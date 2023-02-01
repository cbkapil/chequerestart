
import express from "express";
import auth from "../Auth.js"
import partyData from "../../models/PartyModel.js"

const router = express.Router();

router.delete("/deletee/:id", auth, async (req, res) => {
  console.log("helloooooo", req.params.id);

  try { 
   const data = await partyData.findByIdAndDelete(req.params.id);
   console.log(data)
         if (data){


            res.status(200).json({ message: "Firm Data added", status: true, data:data });
         }
    
  } catch (err) {
    console.log(err);
  }
});

export default router;

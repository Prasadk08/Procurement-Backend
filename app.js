import express from "express"
import cors from "cors"

import mongoose from "mongoose";
import dotenv from "dotenv"


import compareRoutes from "./route/CompareRoute.js"
import rfpRoutes from "./route/RfpRoute.js"
import vendorRoutes from "./route/VendorRoute.js"
import proposalRoutes from "./route/ProposalRoute.js"

dotenv.config()

// let localDbUrl = mongodb://127.0.0.1:27017/rfp

let atlasUrl = process.env.MONGODB_URI
async function main(){
    await mongoose.connect(atlasUrl)
}

main().then((res)=> console.log("Connected to Database"))
.catch((err)=> console.log("Failed to connect Db ",err))



const app = express()

app.use(
  cors({
    origin: ["http://localhost:3000", "https://procurement-frontend-ten.vercel.app/"],
    credentials: true,
  })
);

const port = 8080

app.use(cors())
app.use(express.json())

app.use("/rfp/",rfpRoutes)
app.use("/compare/",compareRoutes)
app.use("/proposal/",proposalRoutes)
app.use("/vendor/",vendorRoutes)

app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`)
})
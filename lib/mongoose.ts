import mongoose from 'mongoose';

let isConnected = false;// Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(!process.env.MONGODB_URI_EXTERNAL) return console.log('MONGODB_URI_EXTERNAL is not defined');
  if(!process.env.MONGODB_URI_INTERNAL) return console.log('MONGODB_URI_INTERANL is not defined');

  if(isConnected) return console.log('=> using existing database connection');

  try {
    await mongoose.connect(process.env.MONGODB_URI_EXTERNAL as string);
    isConnected = true;
    console.log('MongoDB Connected MONGODB_URI_EXTERNAL');
  } catch (error) {
      console.log(error)
      console.log('MONGODB_URI_EXTERNAL is failed')
      try {
          await mongoose.connect(process.env.MONGODB_URI_INTERNAL as string);
          isConnected = true;
          console.log('MongoDB Connected MONGODB_URI_INTERNAL');
      } catch (error) {      
        console.log(error)
        console.log('MONGODB_URI_INTERNAL is failed')
      }
  }
}
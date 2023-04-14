import mongoose from 'mongoose';
const validateMongoDB = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error ("this is not a valid Mongo");
};

export default validateMongoDB;
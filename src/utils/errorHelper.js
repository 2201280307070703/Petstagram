function getFirstMongooseError(error){
    const firstError =  Object.values(error.errors)[0].message;

    return firstError;
}

exports.getErrorMessage = (error) => {
    if(error.name === 'ValidationError'){
        return getFirstMongooseError(error);
    }else{
        return error.message;
    }
}
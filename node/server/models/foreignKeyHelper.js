const foreignKeyHelper = (model, id) => {
  return new Promise((resolve, reject) => {
    model.findOne({ _id: id }, (err, result) => {
      if (result) {
        return reject(new Error('FK Constraint error'));
      } else {
        return resolve(true);
      }
    });
  });
};

export default foreignKeyHelper;

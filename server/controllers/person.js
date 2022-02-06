exports.create = async (req, res) => {
  res.send("hello create person");
};

exports.list = async (req, res) => {
  res.send("hello list person");
};

exports.read = async (req, res) => {
  res.send("hello read person");
};

exports.update = async (req, res) => {
  res.send("hello update person");
};

exports.remove = async (req, res) => {
  res.send("hello remove person");
};

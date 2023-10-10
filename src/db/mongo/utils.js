function PrepareObject(input) {
    if (!input) return {};

    let output = {};

    if (Array.isArray(input)) {
        input.forEach((item, index) => {
            output[index] = item;
        });
    } else if (typeof input === "object") {
        if (input._id) {
            output = {
                ...input,
                _id: mongodb.ObjectID(input._id)
            };
        } else {
            output = { ...input };
        }
    }

    return output;
}


module.exports = { PrepareObject }
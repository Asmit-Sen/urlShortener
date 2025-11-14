const customError = (err, req, res) => {
    if(res.status) return res.send({"message" : err.message})
    return res.status(500).send({"message" : "Some Internal Error Occured"})
}

export default customError
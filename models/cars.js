module.exports = (mongoose) => {
    const Cars = mongoose.model(
        'car',
        mongoose.Schema(
            {
                carMake: String,
                carModel: String,
                engineSize: String,
                color: String,
                year: String,
                price: String,
            },
            { timestamps: true }
        )
    );
    return Cars;
};


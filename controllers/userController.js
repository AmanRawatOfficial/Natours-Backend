const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./factoryHandler');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    for (let key in obj) {
        if (allowedFields.includes(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
};

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.updateUser = catchAsync(async (req, res, next) => {
    // 1) if data contains password send error
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password update. use /update-password',
                400
            )
        );
    }

    // 2) filer the unwanted properties from req.body obj
    const filteredObj = filterObj(req.body, 'name', 'email');

    // 3) update user data if req.body doesn't contains password
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObj, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!',
    });
};
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!',
    });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUserAdmin = factory.updateOne(User);
exports.deleteUserAdmin = factory.deleteOne(User);

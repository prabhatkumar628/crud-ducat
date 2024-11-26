import { Employee } from "../models/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const home = asyncHandler(async (req, res) => {
    const data = await Employee.find().sort({ _id: -1 })
    res.render("index", {
        data,
        errorMessage: {}
    })
})

const add = asyncHandler(async (req, res) => {
    res.render("add", {
        data: {},
        errorMessage: {}
    })
})

const storeRecord = asyncHandler(async (req, res) => {
    let errorMessage = {}
    const { name, email, phone, designation, salary, city, state } = req.body
    let data
    data = req.body
    try {
        await Employee.create({
            "name": name,
            "email": email,
            "phone": phone,
            "designation": designation,
            "salary": salary,
            "city": city,
            "state": state
        })
        res.redirect("/")
    } catch (error) {
        error.errors?.name ? errorMessage["name"] = error.errors.name?.message : null
        error.errors?.email ? errorMessage["email"] = error.errors.email?.message : null
        error.errors?.phone ? errorMessage["phone"] = error.errors.phone?.message : null
        error.errors?.designation ? errorMessage["designation"] = error.errors.designation?.message : null
        error.errors?.salary ? errorMessage["salary"] = error.errors.salary?.message : null
        res.render("add", {
            data: data,
            errorMessage: errorMessage
        })
    }
})

const deleteRecord = asyncHandler(async (req, res) => {
    const data = await Employee.deleteOne({ _id: req.params?._id })
    res.redirect("/")
})

const edit = asyncHandler(async (req, res) => {
    const data = await Employee.findById(req.params?._id)
    res.render("update", {
        data: data,
        errorMessage: {}
    })
})

const addEdit = asyncHandler(async (req, res) => {
    let errorMessage = {}
    const { name, email, phone, designation, salary, city, state } = req.body
    let data
    data = req.body
    try {
        const newdata = await Employee.findOne({_id:req.params?._id})
        newdata.name = name
        newdata.email = email
        newdata.phone = phone
        newdata.designation = designation
        newdata.salary = salary
        newdata.city = city
        newdata.state = state
        await newdata.save()
        res.redirect("/")
    } catch (error) {
        error.errors?.name ? errorMessage["name"] = error.errors.name?.message : null
        error.errors?.email ? errorMessage["email"] = error.errors.email?.message : null
        error.errors?.phone ? errorMessage["phone"] = error.errors.phone?.message : null
        error.errors?.designation ? errorMessage["designation"] = error.errors.designation?.message : null
        error.errors?.salary ? errorMessage["salary"] = error.errors.salary?.message : null
        res.render("update", {
            data: data,
            errorMessage: errorMessage
        })
    }
})

const search = asyncHandler(async (req, res) => {
    const search = req.query.search

    const data = await Employee.find({
        $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { designation: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } },
            { state: { $regex: search, $options: "i" } },

        ]
    }).sort({_id:-1})
    res.render("index", {
        data: data,
        errorMessage: {}
    })
})

export {
    home,
    add,
    storeRecord,
    deleteRecord,
    edit,
    addEdit,
    search
}
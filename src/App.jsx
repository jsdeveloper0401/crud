import React, { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";

const App = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        age: "",
        phone: "",
        email: "",
    });
    const [search, setSearch] = useState("");
    const [formError, setFormError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setFormError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let id = nanoid();
        const payload = { ...form, id };

        // Trimming input values before validation
        const trimmedForm = Object.fromEntries(
            Object.entries(form).map(([key, value]) => [key, value.trim()])
        );

        const isEmptyField = Object.values(trimmedForm).some(
            (val) => val === ""
        );

        if (isEmptyField) {
            setFormError(true);
            return;
        }

        setUsers([...users, payload]);
        setForm({ name: "", lastname: "", age: "", phone: "", email: "" });
        e.target.reset();
    };

    const deleteUser = (id) => {
        setUsers(users.filter((item) => item.id !== id));
    };

    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + "...";
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-4">
                    <form id="form" onSubmit={handleSubmit}>
                        <input
                            required
                            onChange={handleChange}
                            type="text"
                            className="form-control my-2"
                            placeholder="Ism"
                            name="name"
                        />
                        <input
                            required
                            onChange={handleChange}
                            type="text"
                            className="form-control my-2"
                            placeholder="Familiya"
                            name="lastname"
                        />
                        <input
                            required
                            onChange={handleChange}
                            type="number"
                            className="form-control my-2"
                            placeholder="Yosh"
                            name="age"
                        />
                        <input
                            required
                            onChange={handleChange}
                            type="tel"
                            className="form-control my-2"
                            placeholder="Telefon"
                            name="phone"
                        />
                        <input
                            required
                            onChange={handleChange}
                            type="text"
                            className="form-control my-2"
                            placeholder="Elektron pochta"
                            name="email"
                        />
                        {formError && (
                            <p style={{ color: "red" }}>
                                Iltimos, hamma maydonlarni to'ldiring!
                            </p>
                        )}
                    </form>
                    <div className="card-footer">
                        <button
                            type="submit"
                            form="form"
                            className="btn btn-success">
                            Foydalanuvchi qo'shish
                        </button>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="search d-flex justify-content-center align-items-center">
                                <input
                                    type="text"
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Qidirish..."
                                    className="form-control my-2"
                                />
                                <button className="btn btn-info search-btn">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="table table-bordered table-striped table-hover my-2">
                        <thead>
                            <tr>
                                <td>T/R</td>
                                <td>Ism</td>
                                <td>Familiya</td>
                                <td>Yosh</td>
                                <td>Telefon</td>
                                <td>Elektron pochta</td>
                                <td>Harakat</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users
                                ?.filter((item) => {
                                    const nameMatch = item.name
                                        .toLowerCase()
                                        .includes(search.toLowerCase());
                                    const lastnameMatch = item.lastname
                                        .toLowerCase()
                                        .includes(search.toLowerCase());
                                    return nameMatch || lastnameMatch;
                                })
                                .map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {truncateString(item.name, 10)}
                                            </td>
                                            <td>
                                                {truncateString(
                                                    item.lastname,
                                                    10
                                                )}
                                            </td>
                                            <td>{item.age}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        deleteUser(item.id)
                                                    }>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default App;

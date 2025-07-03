import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", userName: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";

    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/openeye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.userName.length > 3 &&
      form.password.length > 3
    ) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
      console.log([...passwordArray, form]);
      setForm({ site: "", userName: "", password: "" });
    } else {
      toast("Password should be more then 3 characters!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deletePassword = async (id) => {
    let c = confirm("Are you sure you want to delete this password?");
    if (!c) return;
    setPasswordArray(passwordArray.filter((item) => item.id !== id));

    let res = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter((item)=> item.id !== id)));
  };

  const editPassword = (id) => {
    console.log("Editing Password" + " " + id);
    setForm({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-50 opacity-20 blur-[100px]"></div>
      </div>
      <div className="mx-auto justify-center max-w-4xl pb-24">
        <div className="">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">OP/&gt;</span>
          </h1>

          <p className="text-green-700 text-lg text-center">
            Your own password managar
          </p>
        </div>

        <div className="flex flex-col p-4 gap-8 items-center">
          <input
            className="bg-white rounded-full border-1 border-green-500 w-full px-4"
            type="text"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8">
            <input
              className="bg-white rounded-full border-1 border-green-500 w-full px-4"
              type="text"
              value={form.userName}
              onChange={handleChange}
              placeholder="Enter username"
              name="userName"
              id="userName"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                className="bg-white rounded-full border-1 border-green-500 w-full px-4"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px]  cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1 "
                  width={28}
                  src="icons/openeye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex w-fit hover:bg-green-500 justify-center items-center bg-green-600 border-1 rounded-full px-2 py-1"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              state="hover-swirl"
              colors="primary:#000000,secondary:#000000"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table class="table-auto  w-full overflow-hidden rounded-lg">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th>Site</th>
                  <th>UserName</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-1 border-white text-center w-32">
                        <div className="flex justify-center items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>

                          <div
                            className=" lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-1 border-white text-center w-32">
                        <div className="flex justify-center items-center">
                          {item.userName}
                          <div
                            className=" lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.userName);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-1 border-white text-center w-32">
                        <div className="flex justify-center items-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-1 border-white text-center w-32 ">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/ntjwyxgv.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>

                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="morph"
                            state="morph-trash-full"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;

import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button as BsButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SelectBox from "../../Components/SelectBox/SelectBox";
import TextBox from "../../Components/TextBox/TextBox";
import states from "../../states.json";
import ReactQuill from "react-quill";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";

interface weightsArray {
  id: string | number;
  value: string | number;
}
export default function Signup(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const [physique] = useState([
    {
      id: "ectomorph",
      value: "ectomorph",
    },
    {
      id: "endomorph",
      value: "endomorph",
    },
    { id: "mesomorph", value: "mesomorph" },
  ]);
  const [weights, setWeights] = useState<Array<weightsArray>>([]);
  const [options, setOptions] = useState<Array<weightsArray>>([
    {
      id: "Private Webcam / Skype / Video Chat",
      value: "Private Webcam / Skype / Video Chat",
    },
    {
      id: "Competitive Wrestling",
      value: "Competitive Wrestling",
    },
    {
      id: "Pro Wrestling",
      value: "Pro Wrestling",
    },
    {
      id: "2 on 1 Wrestling",
      value: "2 on 1 Wrestling",
    },
    {
      id: "Judo",
      value: "Judo",
    },
    {
      id: "Karate",
      value: "Karate",
    },
    {
      id: "Grapping",
      value: "Grapping",
    },
    {
      id: "Fantasy Boxing",
      value: "Fantasy Boxing",
    },
    {
      id: "Fantasy Kickboxing ",
      value: "Fantasy Kickboxing ",
    },
    {
      id: "Tag Team Mathces",
      value: "Tag Team Mathces",
    },
    {
      id: "Female Vs Female",
      value: "Female Vs Female",
    },
  ]);

  const regex: any =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$/;

  useEffect(() => {
    const numbers = Array.from(Array(100).keys()).map((i) => ({
      id: i + 1 + "kg",
      value: i + 1 + "kg",
    }));
    setWeights(numbers);
  }, []);

  const handleSignup = async (data: any) => {
    const profilePic = await toBase64(data.profile[0]);
    const verificationPic = await toBase64(data.verification[0]);
    const userData = {
      ...data,
      profile: profilePic,
      verification: verificationPic,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/profile");
  };

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = (value: any) => {
    setValue("about", value);
  };

  useEffect(() => {
    register("about", { required: false });
  }, [register]);

  function sliceIntoChunks(arr: any) {
    const res = [];
    for (let i = 0; i < arr.length; i += arr.length / 2) {
      const chunk = arr.slice(i, i + arr.length / 2);
      res.push(chunk);
    }
    return res;
  }
  return (
    <div className="signup_wrapper pt-5">
      <Container>
        <Row>
          <Col lg={8} className="m-auto">
            <Form noValidate onSubmit={handleSubmit(handleSignup)}>
              <h2 className="signup_heading">Girls Registration</h2>
              <Row>
                {/*   <Col md={12}>
                  <div className="profile-update">
                    <img
                      src="https://fakeimg.pl/350x200/ff0000/000"
                      alt=""
                    ></img>
                    <BsButton className="profile-updat-btn">Edit</BsButton>
                  </div>
                </Col> */}
                <Col md={12}>
                  <TextBox
                    label="Name"
                    placeholder="Enter name"
                    type="text"
                    register={register("name", {
                      required: "Name is required",
                    })}
                    hasError={errors.name}
                    error={errors.name && errors.name.message}
                    isRequired={true}
                    className=""
                  />
                </Col>
                <Col md={12}>
                  <TextBox
                    label="Username"
                    placeholder="Enter Username"
                    type="text"
                    hasError={errors.username}
                    error={errors.username && errors.username.message}
                    isRequired={true}
                    register={register("username", {
                      required: "Username is required",
                    })}
                  />
                </Col>
                <Col md={12}>
                  <TextBox
                    label="Email"
                    placeholder="Enter Email"
                    type="email"
                    register={register("email", {
                      required: "Email is required",
                    })}
                    hasError={errors.email}
                    error={errors.email && errors.email.message}
                    isRequired={true}
                  />
                </Col>

                <Col md={12}>
                  <TextBox
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    register={register("password", {
                      required: "You must specify a password",
                      pattern: {
                        value: regex,
                        message:
                          "Password must have at least 9 characters,1 number,special characters,1 uppercase and 1 lowercase",
                      },
                    })}
                    isRequired={true}
                    hasError={errors.password}
                    error={errors.password && errors.password.message}
                  />
                </Col>
                <Col md={12}>
                  <TextBox
                    label="Password confirmation"
                    placeholder="Enter password"
                    type="password"
                    register={register("confirm_password", {
                      required: "Confirm Password is required",
                      validate: (value) => {
                        const { password } = getValues();
                        return password === value || "Passwords should match!";
                      },
                    })}
                    isRequired={true}
                    hasError={errors.confirm_password}
                    error={
                      errors.confirm_password && errors.confirm_password.message
                    }
                  />
                </Col>
                <Col md={6}>
                  <TextBox
                    label="Profile pic"
                    placeholder=""
                    type="file"
                    register={register("profile", {
                      required: "Profile pic is required",
                    })}
                    hasError={errors.profile}
                    error={errors.profile && errors.profile.message}
                  />
                </Col>
                <Col md={6}>
                  <TextBox
                    label="Verification pic"
                    placeholder=""
                    type="file"
                    register={register("verification", {
                      required: "Verification pic is required",
                    })}
                    hasError={errors.verification}
                    error={errors.verification && errors.verification.message}
                  />
                </Col>
                <Col md={12}>
                  <p className="verification_notice">
                    Due to recent fake profiles, SessionGirls is requiring a
                    verification photo that is displyed underneat your profile
                    picture. this photo will be made public. please take a photo
                    of yourself <a href="/">holding a handwritten sign</a> that
                    says "SessionGirls" on it. your profile will not be approved
                    without it. if you don't want your face shown for privacy
                    reasons, email
                    <a href="mailto:admin@sessiongirls.com">
                      admin@sessiongirls.com
                    </a>
                    . Thank you.
                  </p>
                </Col>
                <Col md={6}>
                  <SelectBox
                    label="Height"
                    options={weights}
                    register={register("height", {
                      required: false,
                    })}
                  />
                </Col>
                <Col md={6}>
                  <SelectBox
                    label="Weight"
                    options={weights}
                    register={register("weight", {
                      required: false,
                    })}
                  />
                </Col>
                <Col md={6}>
                  <SelectBox
                    label="Physique"
                    options={physique}
                    register={register("physique", {
                      required: false,
                    })}
                  />
                </Col>
                <Col md={6}>
                  <TextBox
                    label="Birth date (optional)"
                    type="date"
                    register={register("dob", {
                      required: false,
                    })}
                  />
                </Col>
                <Col md={6}>
                  <TextBox
                    label="City"
                    placeholder="Enter city"
                    type="text"
                    register={register("city", {
                      required: "City is required",
                    })}
                    hasError={errors.city}
                    error={errors.city && errors.city.message}
                  />
                </Col>
                <Col md={6}>
                  <SelectBox label="State" options={states} />
                </Col>
                <Col md={6}>
                  <TextBox
                    label="Country"
                    placeholder=""
                    type="text"
                    register={register("country", {
                      required: false,
                    })}
                  />
                </Col>
                <Col md={6}>
                  <TextBox
                    label="Phone"
                    placeholder=""
                    type="text"
                    register={register("phone", {
                      required: false,
                    })}
                  />
                </Col>

                <Col md={12}>
                  <Form.Label style={{ textAlign: "left", width: "100%" }}>
                    About me
                  </Form.Label>
                  <ReactQuill className="editor" onChange={handleChange} />
                </Col>
              </Row>
              <Row>
                {sliceIntoChunks(options).map((option, index) => (
                  <Col md={6}>
                    <Form.Group className="mb-3 mt-5">
                      {option.map((op: any) => (
                        <Form.Check
                          type="checkbox"
                          label={op.value}
                          value={op.id}
                          {...register("options", {
                            required: false,
                          })}
                        />
                      ))}
                    </Form.Group>
                  </Col>
                ))}
              </Row>
              <Row className="mt-5 text-center ">
                <Col md={12}>
                  <Button
                    className="register_button w-50 mb-5"
                    type="submit"
                    label="Register"
                  />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import SelectBox from "../../Components/SelectBox/SelectBox";
import TextBox from "../../Components/TextBox/TextBox";
import states from "../../states.json";

import "./Profile.css";
interface weightsArray {
  id: string | number;
  value: string | number;
}
export default function Profile() {
  const [userData, setUserData] = useState<any>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const fileRef: any = useRef();
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
  ]);

  useEffect(() => {
    const numbers = Array.from(Array(100).keys()).map((i) => ({
      id: i + 1 + "kg",
      value: i + 1 + "kg",
    }));
    setWeights(numbers);
  }, []);

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

  useEffect(() => {
    const data = localStorage.getItem("userData");
    let user: any;

    if (data) {
      user = JSON.parse(data);

      if (user.username) {
        setUserData(user);
        Object.keys(user).forEach((key) => {
          console.log(" =>", key, user[key]);
          setValue(key, user[key]);
        });
      } else {
        navigate("/signup");
      }
    } else {
      navigate("/signup");
    }
  }, []);

  const handleProfileEdit = (data: any) => {
    console.log(data);
    const formdata = { ...userData, ...data };

    localStorage.setItem("userData", JSON.stringify(formdata));
    setUserData(formdata);
  };

  const updateImage = async () => {
    const file = fileRef.current.files[0];
    const image = await toBase64(file);
    const data: any = localStorage.getItem("userData");

    const userDt = JSON.parse(data);
    let userData: any = { ...userDt, profile: image };
    setUserData(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };
  const fileSelectHandler = () => {
    fileRef.current.click();
  };
  return (
    <div className="profile_wrapper">
      <input
        id="selectImage"
        type="file"
        style={{ display: "none" }}
        onChange={updateImage}
        ref={fileRef}
      />
      <Container>
        <h2>{userData?.name}</h2>
        <Row className="mt-5">
          <Col md={4}>
            <Image src={userData?.profile} className="profile_image" />
          </Col>
          <Col md={4} className="ml-4">
            <Button
              className="update_profile_button"
              type="button"
              onClick={fileSelectHandler}
            >
              Update photo gallery
            </Button>
            <h2>Show Profile</h2>
          </Col>
        </Row>
        <h2 className="mt-3">Stats</h2>
        <Form noValidate onSubmit={handleSubmit(handleProfileEdit)}>
          <Row md={12}>
            <Col md={6}>
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
              <SelectBox
                label="State"
                options={states}
                register={register("state", {
                  required: false,
                })}
              />
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
            <Col md={6}>
              <TextBox
                label="Travel Phone"
                placeholder=""
                type="text"
                register={register("travel_phone", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <SelectBox
                label="Height"
                options={[]}
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
                defaultValue={userData?.weight}
              />
            </Col>
            <Col md={6}>
              <SelectBox
                label="Build"
                options={physique}
                register={register("build", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <SelectBox
                label="Deadlift"
                options={physique}
                register={register("deadlift", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <SelectBox
                label="Benchpress"
                options={physique}
                register={register("benchpress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <SelectBox
                label="Squat"
                options={physique}
                register={register("squat", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <SelectBox
                label="Legpress"
                options={physique}
                register={register("legpress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Birth date:(optional)"
                type="date"
                register={register("dob", {
                  required: false,
                })}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>About me</h2>
              <ReactQuill
                className="editor"
                onChange={handleChange}
                value={userData?.about}
              />
            </Col>

            <Col md={12}>
              <h2>Contact Info</h2>
            </Col>
            <Col md={6}>
              <TextBox
                label="Facebook webaddress"
                placeholder=""
                type="text"
                register={register("fb_address", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Personal webaddress #1"
                placeholder=""
                type="text"
                register={register("p_webaddress_1", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Personal webaddress #2"
                placeholder=""
                type="text"
                register={register("p_webaddress_2", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Twitter webaddress "
                placeholder=""
                type="text"
                register={register("twitter_webaddress_2", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Amazon wishlist webaddress "
                placeholder=""
                type="text"
                register={register("amazon_webaddress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Youtube webaddress "
                placeholder=""
                type="text"
                register={register("youtube_webaddress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="WB270 webaddress "
                placeholder=""
                type="text"
                register={register("wb270_webaddress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Clips4sale webaddress "
                placeholder=""
                type="text"
                register={register("clips4sale_webaddress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Instagram webaddress "
                placeholder=""
                type="text"
                register={register("instagram_webaddress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Herbiceps webaddress "
                placeholder=""
                type="text"
                register={register("herbiceps_webaddress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Patreaon webaddress "
                placeholder=""
                type="text"
                register={register("patreaon_webaddress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="OnlyFans webaddress "
                placeholder=""
                type="text"
                register={register("onlyfans_webaddress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Cameo webaddress "
                placeholder=""
                type="text"
                register={register("cameo_webaddress", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Skype webaddress "
                placeholder=""
                type="text"
                register={register("skype_username", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Whatsapp webaddress "
                placeholder=""
                type="text"
                register={register("whatsapp_username", {
                  required: false,
                })}
              />
            </Col>
            <h2>Other websites</h2>
            <Col md={6}>
              <TextBox
                label="Website #3 name "
                placeholder=""
                type="text"
                register={register("web3_name", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Website #4 name "
                placeholder=""
                type="text"
                register={register("web4_name", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Website #5 name "
                placeholder=""
                type="text"
                register={register("web5_name", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Website #6 name "
                placeholder=""
                type="text"
                register={register("web6_name", {
                  required: false,
                })}
              />
            </Col>
            <Col md={6}>
              <TextBox
                label="Website #7 name "
                placeholder=""
                type="text"
                register={register("web7_name", {
                  required: false,
                })}
              />
            </Col>
            <h2>Offered Services</h2>
            <Col md={12}>
              <Form.Group className="mb-3 mt-5">
                {options.map((option, i) => (
                  <Form.Check
                    type="checkbox"
                    label={option.value}
                    value={option.id}
                    {...register("options", {
                      required: false,
                    })}
                  />
                ))}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={12}>
              <Button className="register_button" type="submit">
                Update Profile
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

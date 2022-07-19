import { useState } from "react";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/client";
import Link from "next/link";
import { getProviders } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ISignIn {
  providers: object;
  csrfToken: string;
}

export default function Register({ providers, csrfToken }: ISignIn) {
  const {
    query: { callbackUrl },
  } = useRouter();

  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm(); // useForm({ mode: "onChange" });
  // console.log(watch("email"));

  const userpwdConfirm = watch("userpwd");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    // setLoading(true);
    const { email, name, nickname, userpwd, phone, agegroup, gender } = data;

    console.log(data);

    axios
      .post(`${process.env.NEXT_PUBLIC_API}/register`, {
        email,
        name,
        nickname,
        userpwd,
        phone,
        agegroup,
        gender,
      })
      .then(function (resp) {
        console.log(resp);
        //setLoading(false);
      })
      .catch((error) => console.log(error.response, "111"));

    // axios
    //   .post(`${process.env.NEXT_PUBLIC_API}/register`, {
    //     email,
    //     name,
    //     nickname,
    //     userpwd,
    //     phone,
    //     agegroup,
    //     gender,
    //   })
    //   .then(function (resp) {
    //     toast("축하드립니다. 회원가입이 정상적으로 완료되었습니다.", {
    //       position: "top-center",
    //       autoClose: 2000,
    //     });
    //     signIn("credentials", { email, userpwd });
    //     let timer = setTimeout(() => {
    //       router.push("/");
    //       clearTimeout(timer);
    //     }, 2000);
    //   })
    //   .catch((e) => {
    //     if (axios.isAxiosError(e)) {
    //       console.log({
    //         e,
    //         type: "axios-error",
    //       });
    //       alert(e?.response?.data);
    //     } else {
    //       console.log({
    //         e,
    //         type: "stock-error",
    //       });
    //     }
    //   });

    // setLoading(false);
  };

  return (
    <div className="login_form">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <div className="tit">Name</div>

          <div>
            <input
              type="text"
              placeholder="홍길동"
              autoComplete="off"
              {...register("name", {
                required: true,
                pattern: /^[가-힣]{2,7}$/,
              })}
            />
          </div>
        </label>

        <label>
          <div className="tit">NickName</div>

          <div>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요."
              autoComplete="off"
              {...register("nickname", {
                required: true,
                pattern: /^[가-힣]{2,7}$/,
              })}
            />
          </div>
        </label>

        <label>
          <div className="tit">Email</div>
          <div>
            <input
              type="email"
              placeholder="example@example.com"
              autoComplete="off"
              {...register("email", {
                required: true,
                pattern:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              })}
            />
          </div>
        </label>

        <label>
          <div className="tit">AGE GROUP</div>
          <div>
            <select id="agegroup" {...register("agegroup")}>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대">40대</option>
              <option value="50대이상">50대이상</option>
            </select>
          </div>
        </label>
        <label>
          <div className="tit">GENDER</div>
          <div className="box_radio">
            <input
              {...register("gender")}
              type="radio"
              value="남성"
              id="male"
              defaultChecked={true}
            />
            남성
            <input
              {...register("gender")}
              type="radio"
              value="여성"
              id="female"
            />
            여성
          </div>
        </label>
        <label>
          <div className="tit">Phone</div>
          <div>
            <input
              type="number"
              placeholder="01012345678"
              autoComplete="off"
              {...register("phone", {
                required: true,
                pattern: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g,
              })}
            />
          </div>
        </label>
        <label>
          <div className="tit">Password</div>
          <div>
            <input
              type="password"
              defaultValue=""
              autoComplete="off"
              placeholder="영문 소문자 / 숫자 / 특수기호 중 2가지 이상 조합 8~16자"
              {...register("userpwd", {
                required: true,
                minLength: 8,
                maxLength: 16,
                pattern:
                  /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
              })}
            />
          </div>
        </label>
        <label>
          <div className="tit">Password Confirm</div>
          <div>
            <input
              type="password"
              autoComplete="off"
              placeholder="비밀번호 확인을 위해 입력해주세요."
              {...register("userpwd_confirm", {
                required: true,
                // validate: value => value === userpwdConfirm
              })}
            />
          </div>
        </label>
        <input type="submit" disabled={loading} value="동의하고 회원가입" />
      </form>
      <div className="txt_read_yakawn">
        <Link href="/yakwan/policy">
          <a>이용약관</a>
        </Link>
        ,{" "}
        <Link href="/yakwan/privacy">
          <a>개인정보 수집 및 이용</a>
        </Link>
        , 내용을 확인하였고 동의합니다.
      </div>
    </div>
  );
}

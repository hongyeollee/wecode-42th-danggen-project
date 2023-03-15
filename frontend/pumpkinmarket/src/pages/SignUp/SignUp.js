import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  useEffect(() => {
    fetch(`../../../public/data/test.json`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }, []);

  const [image, setImage] = useState({
    image_file: '',
    preview_URL: 'img/default_image.png',
  });

  const navigate = useNavigate();
  let inputRef;

  function signUpSumbit() {
    navigate('/login');
  }

  const saveImage = e => {
    e.preventDefault();
    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center leading-10 h-screen align-items: center;">
        <form
          className="flex flex-col space-x-6 justify-center items-center"
          encType="multipart/form-data"
          method="POST"
          action="login"
        >
          <div className="img-wrapper flex w-full h-24 max-w-xs overflow-hidden">
            <img src={image.preview_URL} className="rounded-full" />
          </div>
          <label for="avatar">Avatar</label>
          <input
            multiple
            type="file"
            class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
            name="avatar"
            accept="image/*"
            id="profileImg"
            onChange={saveImage}
            onClick={e => (e.target.value = null)}
            ref={refParam => (inputRef = refParam)}
            // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
            // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
          />
          <input
            placeholder="email"
            type="email"
            name="profile_image_url"
          ></input>
          <input placeholder="name" type="name" name="name"></input>
          <input placeholder="id" type="id" name="id"></input>
          <input placeholder="password" type="password" name="password"></input>
          <input placeholder="phone" type="text" name="phone_number"></input>
          <input type="submit" value="update" onClick="signUpSumbit"></input>
        </form>
      </div>
    </div>
  );
}

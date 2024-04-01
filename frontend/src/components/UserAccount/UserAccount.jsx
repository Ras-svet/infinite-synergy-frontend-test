import React, { useEffect } from "react";
import "./UserAccount.css"
import Avatar from "../../images/avatar.svg"
import { useForm } from "react-hook-form";
import api from "../../utils/api";

function UserAccount (props) {
  const [isEdit, setIsEdit] = React.useState(false);
  const [user, setUser] = React.useState(props.user ? props.user : '');
  const [serverError, setServerError] = React.useState('');
	const [isSucces, setIsSucces] = React.useState(false);
  const { register, handleSubmit, trigger, clearErrors, formState: { errors, isValid }, reset } = useForm({
    mode: "onChange", // Проверять валидность при каждом изменении
  });

  useEffect(() => {
    setIsEdit(false);
    setIsSucces(false)
    setUser({...props.user})
    setServerError('')
  }, [props.user]);

  function handleEditUser(data) {
    api.updateUserInfo(props.user.userId, data)
    .then((res) => {
      props.onHandleUpdateUser(res)
      setUser(res)
      setIsSucces(true)
      setIsEdit(false)
      setServerError('')
      reset()
    })
    .catch((err) => {
      setServerError(err.message)
      setIsEdit(true)
      setIsSucces(false)
      reset()
    })
  }

  function handleEdit() {
    setIsEdit(true);
    setServerError('')
    reset()
  }

  function handleChange() {
    setServerError('')
    clearErrors()
    trigger()
  }

  return (
    props.user && (
      <div className="account">
        <form className="account__edit" onSubmit={handleSubmit(handleEditUser)}>
          <div className="account__edit-block">
            <h1 className="account__id">Пользователь </h1>
            {isEdit? <input className="account__id account__id-edit" {...register("userId", { 
                  required: "Поле 'ID' обязательно для заполнения", 
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Поле 'ID' должно содержать только цифры"
                  }
                })} onInput={handleChange} defaultValue={user.userId}></input> : <h1 className="account__id"> {user.userId}</h1> }
          </div>
          <div className="account__edit-block">
            <img className="account__image" src={Avatar} alt="Аватар пользователя" />
            <div className="account__info">
              <h2 className="account__info-title">Возраст:</h2>
              {isEdit? <input className="account__info-data account__info-data_edit" {...register("age", { 
                  required: "Поле 'Возраст' обязательно для заполнения",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Поле 'Возраст' должно содержать только цифры"
                  }
                })} onInput={handleChange} defaultValue={user.age}></input> : <p className="account__info-data">{user.age}</p>}
              <h2 className="account__info-title">Имя:</h2>
              {isEdit? <input className="account__info-data account__info-data_edit" {...register("firstName", { 
                required: "Поле 'Имя' обязательно для заполнения" })} onInput={handleChange} defaultValue={user.firstName} ></input> : <p className="account__info-data">{user.firstName}</p>}
              <h2 className="account__info-title">Фамилия:</h2>
              {isEdit? <input className="account__info-data account__info-data_edit" {...register("lastName", { 
                required: "Поле 'Фамилия' обязательно для заполнения" })} onInput={handleChange} defaultValue={user.lastName}></input> : <p className="account__info-data">{user.lastName}</p>}
              <h2 className="account__info-title">Почта:</h2>
              {isEdit? <input className="account__info-data account__info-data_edit" {...register("email", { 
                required: "Поле 'Почта' обязательно для заполнения",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Поле 'Почта' должно быть формата example@mail.ru"
                }
              })} onInput={handleChange} defaultValue={user.email} type='email'></input> : <p className="account__info-data">{user.email}</p>}
            </div>
          </div>
          {isEdit
            ? <>
                <span className="account__error">{Object.values(errors).length ? Object.values(errors).map((error, index) => (<p key={index}>{error.message}</p>)) : serverError}</span>
                <button disabled={!isValid || serverError !== ''} type="submit" className={`account__button-save ${isValid && serverError === '' ? '' : 'account__button-save_disable'}`}>Сохранить</button>
              </>
            : <nav>
                <ul className="account__buttons">
                  <span className="account__allgood">{isSucces ? 'Данные успешно изменены' : ''}</span>
                  <li className="account__button account__button-edit" onClick={handleEdit}>Редактировать</li>
                </ul>
              </nav>}
        </form>
      </div>
    )
  )
}

export default UserAccount;

import {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export const CreatePage = () => {

    const auth = useContext(AuthContext)

    useEffect( () => {
        window.M.updateTextFields()
    }, [])

    const {request} = useHttp()
    const [link, setLink] = useState('')

    let navigate = useNavigate()

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
              const data = await request(
                  '/api/link/generate',
                  'POST',
                  {from: link},
                  {Authorization: `Bearer ${auth.token}`}
              )
                navigate(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }

    return (
        <div className={'row'}>
            <div className={'col s8 offset-s2'} style={{paddingTop: '2rem'}}>
                <div className="input-field ">
                    <input
                        id="link"
                        type="text"
                        placeholder={'Вставьте ссылку'}
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}
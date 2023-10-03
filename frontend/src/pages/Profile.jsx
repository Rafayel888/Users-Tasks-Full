import React from 'react';
import { UserProfile } from '../components/UserProfile/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { setStatic } from '../redux/slices/tasks';

export const Profile = () => {
  const data = useSelector((state) => state.tasks.static);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data?.user);


  React.useEffect(() => {
    try {
      axios
        .get('tasks/static')
        .then((res) => {
          dispatch(setStatic(res.data));
        })
        .catch((error) => {
          console.log('Error while receiving data:', error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className='table_wrapper'>
        <UserProfile user={user} />

        <div className='div_table'>
          <table className='table_container'>
            <tbody>
              <tr>
                <th>STATUS</th>
                <th>COUNT</th>
              </tr>
              {data.length ? (
                data?.map((elm, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{elm.status}</td>
                      <td>{elm.count}</td>
                    </tr>
                  );
                })
              ) : (
                <>
                  <tr>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

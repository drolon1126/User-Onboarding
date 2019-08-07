import React from 'react';

class UserList extends React.Component {
  render(){
    return(
      <>
      {this.props.list.map(user=>{
        return(
          <div>
            <h3>{user.name}</h3>
            <h4>{user.email}</h4>
          </div>
        );
      })}
      </>
    );
  }
}

export default UserList;
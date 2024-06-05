import {useState} from "react";

export default function Player({playerName, playerSymbol, isActive, onChangeName}){

    const [isEditing, setIsEditing] = useState(false);
    const [name,setName] = useState(playerName)

    // function handleEdit(){
    //     setIsEditing(!isEditing);
    //     setIsEditing(!isEditing);
    // } --> State takes old value --> one statement and both statements will work same
    
    function handleEdit() {
        setIsEditing((editing)=>!editing);
        if(isEditing){
            onChangeName(playerSymbol,name);
        }
    }

    function handleChange(event) {
        setName(event.target.value);
    }

    return(
        <li className={isActive?'active':undefined}>
            <span className="player">
            {!isEditing && 
              <span className="player-name">{name}</span>
            }
            {isEditing && <input type ="text" required value={name} onChange={handleChange}/>
            }
            <span className="player-symbol">{playerSymbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing?'Save':'Edit'}</button>
        </li>
    );
}
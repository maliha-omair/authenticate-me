import { NavLink, useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import image from "../../assets/groupDisplayHd.jpeg"
import styles from "../GetAGroup/GetAGroup.module.css"
import Divider from "../Divider/Divider";
import { useState } from "react";
import { useEffect } from "react";
import { getGroupByIdThunk } from "../../store/groups";

export default function GetAGroup(){
    const [showAbout, setShowAbout] = useState(false)
    const [showEvents, setShowEvents] = useState(false)
    const params = useParams();
    let groupId = params.groupId;
    const group  = useSelector(state => state.group.currentGroup);
    const sessionUser  = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(()=>{
        console.log(groupId)
        groupId = params.groupId;
        dispatch(getGroupByIdThunk(groupId));
    },[dispatch]);

    function aboutClick(){
        setShowAbout(true)
        setShowEvents(false)
    }

    function eventsClick(){
        setShowAbout(false)
        setShowEvents(true)
    }
    if(!sessionUser){
        history.push("/")
    }
    
    return( group &&(
        <div className={styles.main}>
            <div className={styles.mainDiv}> 

                <div className={styles.groupDetail}>
                    <div className={styles.imageDiv}>
                        <img src={image} className={styles.groupImage}></img>
                    </div>
                    <div>
                        <div className={styles.groupName}>
                            {group.name}
                        </div>
                        <div className={styles.cityState}>
                            {group.city}, {group.state}
                        </div>
                        <div className={styles.members}>
                            {group.numMembers} members - {group.private ? `Private`: `Public`}
                        </div>
                        <div className={styles.organizedBy}>
                            Organized by {group.organizerId}
                        </div>
                    </div>
                </div>
                {/* <div>
                is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                </div> */}
                
                <Divider></Divider>
                <div className={styles.innerMenu}>
                    <div  >
                        <div className={styles.tabs}>
                            <NavLink to="#" onClick={aboutClick}>About</NavLink> 
                            <NavLink to="#" onClick={eventsClick}>Events</NavLink> 
                        </div>
                    </div>
                    <div >               
                        <div >
                            {showAbout && (
                                <div className={styles.tabs}>
                                    {group.about}
                                </div>

                            )}                                        
                            {showEvents && (
                                    <div className={styles.tabs}>
                                        Events
                                    </div>

                            )}
                        </div>                
                    </div>
                </div>
            </div>
        </div>
    ))
}
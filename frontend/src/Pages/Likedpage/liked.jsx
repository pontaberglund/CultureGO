// import CultureGo from "../../Components/icons/CultureGo";
// import HomeIcon from "../../Components/icons/HomeIcons";
import TrashIcon from "../../Components/icons/Trash.svg";
import SortIcon from "../../Components/icons/Sort.svg";
import Sort from "../../Components/icons/Sort.jsx";
import Trash from "../../Components/icons/Trash.jsx";

import LogoText from "../../Components/icons/LogoText";

import LikedCard from "./LikedCard";

import {useState, useEffect} from 'react'

import {deleteContext} from './DeleteContext'

const Liked = () => {

    var [del, setDel] = useState(false)

    const fn = (a, value) => {

        if (value)
        {
            setRemove(r => {
                if (r.indexOf(a) == -1)
                    r.push(a)

                return r
            })
        }
        else
        {
            setRemove(r => {
                if (r.indexOf(a) != -1)
                    r.splice(r.indexOf(a), 1)

                return r
            })
        }
    }


    // for (let i = 0; i < 7; i++)
    // {
    //     let card = <LikedCard key={i} name={`Abba the museum ${i}`} location='Stockholm' callbackFunc={(value) => {fn(i, value)}}
    //                 img='https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/charlie.jpg'/>

    //     tempmap.set(i, card)
    //     temp.push(card)
    // }

    var [list, setList] = useState([])
    var [remove, setRemove] = useState([])
    var [map, setMap] = useState(new Map())

    console.log(map)

    useEffect(() => {

        let ignore = false

        const getData = async () => {
            let data = await fetch('http://localhost:4000/likes?page=0')
                .then(res => {
                    let json = res.json();
                    console.log(json)
                    return json
                })
                .then(json => {
                    console.log(json)
                    return json
                })
            
            if (ignore)
                return;

            for (let sight of data)
            {
                let card = <LikedCard key={sight.sight_id} name={sight.sight_id} location='Stockholm' callbackFunc={(value) => {fn(sight.sight_id, value)}}
                                img='https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/charlie.jpg'/>

                setList(ls => {
                    ls = ls.slice()
                    ls.push(card)
                    return ls
                })

                setMap(rm => {
                    rm.set(sight.sight_id, card)
                    return rm
                })
            }
        }

        getData()

        // destructor function
        return () => ignore = true
    }, [])

    const func = () => {
        setDel(del => !del);
    }

    const performRemove = () => {
        list = list.slice()

        for (let id of remove)
        {
            list.splice(list.indexOf(map.get(id)), 1)
            map.delete(id)
        }

        fetch('http://localhost:4000/likes', {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(remove)
        })

        setList(list);
        setRemove([]);
        setMap(map);
    }

    return (
        <div className=" w-full h-screen bg-white overflow-hidden">
            <div className=" w-screen h-20">
                {/* top of screen w/ logo */}

                <div className="p-4">
                    <LogoText/>

                </div>

            </div>
            <div className="w-full p-2 relative flex justify-normal h-12">
                {/* options bar */}
                <p className="pt-3 text-xl text p-2 flex-grow">Your liked items:</p>
                <Trash/>
                <Sort/>

            </div>
            <div className=" w-full p-5 pr-8 pl-8 overflow-scroll h-[calc(100vh-var(--navbar-height)-8rem)] overflow-x-hidden">
                {/* container for list */}
                
                <deleteContext.Provider value={del}>
                {
                    list
                }
                </deleteContext.Provider>
                
            </div>
            <button onClick={func}>
                hshshsshhs
            </button>
            <button onClick={performRemove}>
                REMOVE
            </button>
        </div>
    )
}

export default Liked
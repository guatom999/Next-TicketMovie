'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const [data, setData] = useState(new Array(9).fill(''));

    const winPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    interface IListItem {
        data: string[];
        handlerOnclick: (i: number) => void;
    }

    useEffect(() => {

        const res = checkIsSomeOneWin(data, winPattern);
        if (res) {
            alert("winner is" + res)
        }
    }, [data])

    const checkIsSomeOneWin = (data: string[], winPattern: number[][]) => {
        for (let i = 0; i < winPattern.length; i++) {

            if (data[winPattern[i][0]] == "X") {
                console.log("case x")
                if (data[winPattern[i][1]] == "X") {
                    console.log("case x 2")
                    if (data[winPattern[i][2]] == "X") {
                        console.log("case x 3")
                        return "x"
                    }
                }
            }else if(data[winPattern[i][0]] == "O"){
                if(data[winPattern[i][1]] == "O"){
                    if(data[winPattern[i][2]] == "O"){
                        console.log("case O")
                        return "O"
                    }
                }
            }
        }

    };

    const handlerOnClick = (index: number) => {
        const myRound = data.filter((a) => a === '').length % 2 ? true : false;

        if (myRound) {
            console.log(`X ${index}`);
            setData((prevState) => {
                prevState[index] = `X`;
                return [...prevState];
            });
        } else {
            console.log(`O ${index}`);
            setData((prevState) => {
                prevState[index] = `O`;
                return [...prevState];
            });
        }



    };

    const ListItems = (p: IListItem) => {
        return (
            <div className='flex flex-wrap bg-red-400'>
                {p.data.map((element, i) => (
                    <div
                        key={i}
                        onClick={() => p.handlerOnclick(i)}
                        className='flex h-10 w-10 items-center justify-center border border-sky-500'
                    >
                        {element}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='h-[120px] w-[7.5rem] bg-black'>
            <div>
                <ListItems data={data} handlerOnclick={handlerOnClick} />
            </div>
            <pre>artists:{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
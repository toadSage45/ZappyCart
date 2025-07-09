import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs().then((res) => {
            setSubs(res.data);
            setLoading(false);
        });
    }, []);

    const showSubs = () =>
        subs.map((s) => (
            <div
                key={s._id}
                className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3"
            >
                <Link 
                to={`/sub/${s.slug}`}
                 className="btn btn-outline-primary w-100 text-truncate"
                 >{s.name}</Link>
            </div>
        ));

    return (
        <div className="container">
            <div className="row">
                {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
            </div>
        </div>
    );
};

export default SubList;

import React from 'react';


const Card = props =>
(
    <div className="card bg-white">
        <img className="card-img-top" src="https://1m1ncw.bn.files.1drv.com/y4m8JELSHGGGaP_x8Sn6HQkJzB6sqttdPT_XcfK75TCAyfvrf3oWbk7ftpy6gMLx_I5sDu-rQnGNx7tcRcqIeBzXCcHrA5BvsR0WUPu4pCI1A_oCrSDr64Gv4vHFrHYcP2wJBonnk3nX4Yj1lvnAecjZQf2QgyzoEmV2XBsFfgJo97d_WZQq5iBPinaTOp6eYweBkTUirSGFyblllvbc9dHcA?width=728&height=484&cropmode=none" width="728" height="484" />
        <div className="card-body text-center">
            <h4 className="mt-3 mx-1 mx-md-2 mb-4">{props.title}</h4>
            <p className="card-text text-muted p-2 p-sm-3 p-lg-4">{props.content}</p>
        </div>
    </div>
);

export default Card;
import React from 'react';

import { Link } from 'react-router-dom';

import {
  Typography,
  Descriptions,
  Tooltip
} from 'antd';

import { IconContext } from "react-icons";
import {
    RiInformationLine, RiQuestionLine, RiAccountCircleLine
} from 'react-icons/ri';

import tooltipDescs from '../../common/TooltipDescriptions';

const { Title } = Typography;

const CreateIdentityTX = props => {

    const tx = props.data;

    return (
        <div>

            <Title level={4}>
                <IconContext.Provider value={{ className: 'react-icons' }}>
                <RiInformationLine />
                </IconContext.Provider>
                Transaction Type
            </Title>
            <Descriptions bordered column={1} size="middle">

            {tx.type ? (
                <Descriptions.Item label="Type">
                    {tx.type}
                </Descriptions.Item>
            ) :
                null
            }

            </Descriptions>
            
            {tx ? (
                <div>
                <Title level={4}>
                  <IconContext.Provider value={{ className: 'react-icons' }}>
                    <RiInformationLine />
                  </IconContext.Provider>
                  Transaction Info
                </Title>
                <Descriptions bordered column={1} size="middle">

                    {tx.txid ? (
                        <Descriptions.Item label={<span><nobr><IconContext.Provider value={{ className: 'react-icons' }}><Tooltip overlayClassName="explorer-tooltip" title={tooltipDescs.txId}><RiQuestionLine /></Tooltip></IconContext.Provider>Txid</nobr></span>}>
                            <span className="code">{tx.txid}</span>
                        </Descriptions.Item>
                    ) :
                        null
                    }

                    {(tx.data && tx.data.url) ? (
                        <Descriptions.Item label={<span><nobr><IconContext.Provider value={{ className: 'react-icons' }}><Tooltip overlayClassName="explorer-tooltip" title={tooltipDescs.adi}><RiQuestionLine /></Tooltip></IconContext.Provider>ADI</nobr></span>}>
                            <Link to={'/acc/' + tx.data.url.replace("acc://", "")}>
                                <IconContext.Provider value={{ className: 'react-icons' }}><RiAccountCircleLine /></IconContext.Provider>{tx.data.url}
                            </Link>
                        </Descriptions.Item>
                    ) :
                        null
                    }

                    {(tx.data && tx.data.publicKey) ? (
                        <Descriptions.Item label={<span><nobr><IconContext.Provider value={{ className: 'react-icons' }}><Tooltip overlayClassName="explorer-tooltip" title={tooltipDescs.pubKey}><RiQuestionLine /></Tooltip></IconContext.Provider>Public Key</nobr></span>}>
                            {tx.data.publicKey}
                        </Descriptions.Item>
                    ) :
                        null
                    }


                </Descriptions>
                </div>
            ) :
                null
            }
        </div>
    );
}

export default CreateIdentityTX;
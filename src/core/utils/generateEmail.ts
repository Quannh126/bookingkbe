
import { IMailProperties } from '@core/interfaces';
import fs from 'fs'
import handlebars from 'handlebars'
const html = `<table
width="100%"
border="0"
cellpadding="0"
cellspacing="0"
role="presentation"
style="box-sizing: border-box; background-color: #ededed"
bgcolor="#ededed"
>
<tbody style="box-sizing: border-box">
    <tr style="box-sizing: border-box">
        <td style="box-sizing: border-box">
            <table
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="box-sizing: border-box"
            >
                <tbody style="box-sizing: border-box">
                    <tr style="box-sizing: border-box">
                        <td style="box-sizing: border-box">
                            <table
                                class="m_1415598222370852292row-content m_1415598222370852292stack"
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                    box-sizing: border-box;
                                    color: #000;
                                    background-color: #fff;
                                    border-radius: 0;
                                    width: 660px;
                                    margin: 0 auto;
                                "
                                width="660"
                                bgcolor="#fff"
                            >
                                <tbody style="box-sizing: border-box">
                                    <tr style="box-sizing: border-box">
                                        <td
                                            class="m_1415598222370852292column m_1415598222370852292column-1"
                                            width="100%"
                                            style="
                                                box-sizing: border-box;
                                                text-align: left;
                                                font-weight: 400;
                                                padding-bottom: 5px;
                                                padding-top: 5px;
                                                vertical-align: top;
                                                border-top: 0;
                                                border-right: 0;
                                                border-bottom: 0;
                                                border-left: 0;
                                            "
                                            align="left"
                                            valign="top"
                                        >
                                            <table
                                                class="m_1415598222370852292image_block m_1415598222370852292block-1"
                                                width="100%"
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                    box-sizing: border-box;
                                                "
                                            >
                                                <tbody>
                                                    <tr
                                                        style="
                                                            box-sizing: border-box;
                                                        "
                                                    >
                                                        <td
                                                            class="m_1415598222370852292pad"
                                                            style="
                                                                box-sizing: border-box;
                                                                width: 100%;
                                                            "
                                                            width="100%"
                                                        >
                                                            <div
                                                                style="
                                                                    border-collapse: collapse;
                                                                    display: table;
                                                                    width: 100%;
                                                                    height: 100%;
                                                                    background-color: transparent;
                                                                "
                                                            >
                                                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

                                                                <!--[if (mso)|(IE)]><td align="center" width="166" style="width: 166px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                                                <div
                                                                    class="u-col u-col-33p33"
                                                                    style="
                                                                        max-width: 320px;
                                                                        min-width: 166.67px;
                                                                        display: table-cell;
                                                                        vertical-align: top;
                                                                    "
                                                                >
                                                                    <div
                                                                        style="
                                                                            height: 100%;
                                                                            width: 100% !important;
                                                                        "
                                                                    >
                                                                        <!--[if (!mso)&(!IE)]><!--><div
                                                                            style="
                                                                                box-sizing: border-box;
                                                                                height: 100%;
                                                                                padding: 0px;
                                                                                border-top: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-left: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-right: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-bottom: 0px
                                                                                    solid
                                                                                    transparent;
                                                                            "
                                                                        ><!--<![endif]-->
                                                                            <!--[if (!mso)&(!IE)]><!-->
                                                                        </div>
                                                                        <!--<![endif]-->
                                                                    </div>
                                                                </div>
                                                                <!--[if (mso)|(IE)]></td><![endif]-->
                                                                <!--[if (mso)|(IE)]><td align="center" width="166" style="width: 166px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                                                <div
                                                                    class="u-col u-col-33p33"
                                                                    style="
                                                                        max-width: 320px;
                                                                        min-width: 166.67px;
                                                                        display: table-cell;
                                                                        vertical-align: top;
                                                                    "
                                                                >
                                                                    <div
                                                                        style="
                                                                            height: 100%;
                                                                            width: 100% !important;
                                                                            border-radius: 0px;
                                                                            -webkit-border-radius: 0px;
                                                                            -moz-border-radius: 0px;
                                                                        "
                                                                    >
                                                                        <!--[if (!mso)&(!IE)]><!--><div
                                                                            style="
                                                                                box-sizing: border-box;
                                                                                height: 100%;
                                                                                padding: 0px;
                                                                                border-top: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-left: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-right: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-bottom: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-radius: 0px;
                                                                                -webkit-border-radius: 0px;
                                                                                -moz-border-radius: 0px;
                                                                            "
                                                                        ><!--<![endif]-->
                                                                            <table
                                                                                style="
                                                                                    font-family: arial,
                                                                                        helvetica,
                                                                                        sans-serif;
                                                                                "
                                                                                role="presentation"
                                                                                cellpadding="0"
                                                                                cellspacing="0"
                                                                                width="100%"
                                                                                border="0"
                                                                            >
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="
                                                                                                overflow-wrap: break-word;
                                                                                                word-break: break-word;
                                                                                                padding: 0;
                                                                                                font-family: arial,
                                                                                                    helvetica,
                                                                                                    sans-serif;
                                                                                            "
                                                                                            align="left"
                                                                                        >
                                                                                            <table
                                                                                                width="100%"
                                                                                                cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                border="0"
                                                                                            >
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td
                                                                                                            style="
                                                                                                                padding-right: 0px;
                                                                                                                padding-left: 0px;
                                                                                                            "
                                                                                                            align="center"
                                                                                                        >
                                                                                                            <img
                                                                                                                align="center"
                                                                                                                border="0"
                                                                                                                src="https://bookingk.s3.ap-southeast-1.amazonaws.com/iconImg/logo2.png"
                                                                                                                alt=""
                                                                                                                title=""
                                                                                                                style="
                                                                                                                    outline: none;
                                                                                                                    text-decoration: none;
                                                                                                                    -ms-interpolation-mode: bicubic;
                                                                                                                    clear: both;
                                                                                                                    display: inline-block !important;
                                                                                                                    border: none;
                                                                                                                    height: auto;
                                                                                                                    float: none;
                                                                                                                    width: 100%;
                                                                                                                    max-width: 146.67px;
                                                                                                                "
                                                                                                                width="146.67"
                                                                                                            />
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>

                                                                            <!--[if (!mso)&(!IE)]><!-->
                                                                        </div>
                                                                        <!--<![endif]-->
                                                                    </div>
                                                                </div>
                                                                <!--[if (mso)|(IE)]></td><![endif]-->
                                                                <!--[if (mso)|(IE)]><td align="center" width="166" style="width: 166px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                                                <div
                                                                    class="u-col u-col-33p33"
                                                                    style="
                                                                        max-width: 320px;
                                                                        min-width: 166.67px;
                                                                        display: table-cell;
                                                                        vertical-align: top;
                                                                    "
                                                                >
                                                                    <div
                                                                        style="
                                                                            height: 100%;
                                                                            width: 100% !important;
                                                                            border-radius: 0px;
                                                                            -webkit-border-radius: 0px;
                                                                            -moz-border-radius: 0px;
                                                                        "
                                                                    >
                                                                        <!--[if (!mso)&(!IE)]><!--><div
                                                                            style="
                                                                                box-sizing: border-box;
                                                                                height: 100%;
                                                                                padding: 0px;
                                                                                border-top: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-left: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-right: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-bottom: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-radius: 0px;
                                                                                -webkit-border-radius: 0px;
                                                                                -moz-border-radius: 0px;
                                                                            "
                                                                        ><!--<![endif]-->
                                                                            <!--[if (!mso)&(!IE)]><!-->
                                                                        </div>
                                                                        <!--<![endif]-->
                                                                    </div>
                                                                </div>
                                                                <!--[if (mso)|(IE)]></td><![endif]-->
                                                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table
                class="m_1415598222370852292row-2"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="box-sizing: border-box"
            >
                <tbody style="box-sizing: border-box">
                    <tr style="box-sizing: border-box">
                        <td style="box-sizing: border-box">
                            <table
                                class="m_1415598222370852292row-content m_1415598222370852292stack"
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                    box-sizing: border-box;
                                    color: #000;
                                    background-color: #fff;
                                    width: 660px;
                                    margin: 0 auto;
                                "
                                width="660"
                                bgcolor="#fff"
                            >
                                <tbody style="box-sizing: border-box">
                                    <tr style="box-sizing: border-box">
                                        <td
                                            class="m_1415598222370852292column m_1415598222370852292column-1"
                                            width="100%"
                                            style="
                                                box-sizing: border-box;
                                                text-align: left;
                                                font-weight: 400;
                                                padding-bottom: 5px;
                                                vertical-align: top;
                                                border-top: 0;
                                                border-right: 0;
                                                border-bottom: 0;
                                                border-left: 0;
                                            "
                                            align="left"
                                            valign="top"
                                        >
                                            <table
                                                class="m_1415598222370852292text_block m_1415598222370852292block-1"
                                                width="100%"
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                    box-sizing: border-box;
                                                    word-break: break-word;
                                                "
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            style="
                                                                overflow-wrap: break-word;
                                                                word-break: break-word;
                                                                padding: 18px;
                                                                font-family: arial,
                                                                    helvetica,
                                                                    sans-serif;
                                                                font-size: 16px;
                                                            "
                                                            align="left"
                                                        >
                                                            <div>
                                                                <strong
                                                                    >Thông
                                                                    báo
                                                                    thanh
                                                                    toán
                                                                    thành
                                                                    công</strong
                                                                >
                                                                <br />
                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Kính
                                                                    thưa quý
                                                                    khách
                                                                    <strong
                                                                        >{{name}}</strong
                                                                    >,
                                                                </p>

                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Xin trân
                                                                    trọng
                                                                    cảm ơn
                                                                    quý
                                                                    khách đã
                                                                    lựa chọn
                                                                    sử dụng
                                                                    dịch vụ
                                                                    của nhà
                                                                    xe BY.
                                                                    Chúng
                                                                    tôi xin
                                                                    thông
                                                                    báo quý
                                                                    khách đã
                                                                    đặt vé
                                                                    thành
                                                                    công,
                                                                    sau đây
                                                                    là chi
                                                                    tiết vé
                                                                    của quý
                                                                    khách:
                                                                </p>

                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Điểm
                                                                    đón:
                                                                    <strong
                                                                        >{{pickup}}</strong
                                                                    >
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Điểm
                                                                    đến:

                                                                    <strong
                                                                        >{{dropoff}}</strong
                                                                    >
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Ngày
                                                                    khởi
                                                                    hành:
                                                                    <strong
                                                                        >{{journey_date}}</strong
                                                                    >
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Giờ khởi
                                                                    hành:
                                                                    <strong
                                                                        >{{start_time}}</strong
                                                                    >
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Số ghế:
                                                                    <strong
                                                                        >{{seat}}</strong
                                                                    >
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Mã vé:
                                                                    <strong
                                                                        >{{ticket_code}}</strong
                                                                    >
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Mã giao
                                                                    dịch:
                                                                    <strong
                                                                        >{{payment_code}}</strong
                                                                    >
                                                                </p>

                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Đã thanh
                                                                    toán:
                                                                    <strong
                                                                        >{{amount}}</strong
                                                                    >
                                                                </p>

                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Quý
                                                                    khách
                                                                    lưu ý
                                                                    đến đúng
                                                                    giờ khởi
                                                                    hành.
                                                                    Nếu có
                                                                    mong
                                                                    muốn
                                                                    thay
                                                                    đổi, hủy
                                                                    vé hoặc
                                                                    cần sự
                                                                    hỗ trợ
                                                                    xin vui
                                                                    lòng
                                                                    liên hệ
                                                                    hotline
                                                                    19001****
                                                                    hoặc đến
                                                                    trực
                                                                    tiếp
                                                                    phòng vé
                                                                    tại bến
                                                                    xe để
                                                                    được tư
                                                                    vấn.
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Đây là
                                                                    email tự
                                                                    động xin
                                                                    quý
                                                                    khách
                                                                    không
                                                                    trả lời
                                                                    email
                                                                    này.
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Xin trân
                                                                    trọng
                                                                    cảm ơn.
                                                                </p>

                                                                <p
                                                                    style="
                                                                        font-size: 16px;
                                                                    "
                                                                >
                                                                    Nhà xe
                                                                    BY
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
</tbody>
</table>
`
const generateEmail = async (dateMail: IMailProperties): Promise<string> => {
    try {

        const template = handlebars.compile(html);
        const result = template(dateMail);
        return result;
    } catch (error) {
        console.log('error reading file', error);
        throw error;
    }
};

// const readHTMLFile = (path: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(html);
//             }
//         });
//     });
// };

export default generateEmail;
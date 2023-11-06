export interface IWebPayOrder {
    buy_order:     string;
    session_id:    string;
    amount:        number;
    return_url:    string;
}
export interface WebPayOrderCreateResponse {
    token:         string;
    url:           string;
}
export interface WebPayOrderConfirm {
    token:         string;
}
export interface WebPayOrderConfirmResponse {
    vci:           string;
    amount:        number;
    status:        string;

}

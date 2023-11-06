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
export interface Card_detail {
    card_number:  string;
}
export interface WebPayOrderConfirmResponse {
    vci:           string;
    amount:        number;
    status:        string;
    buy_order:     string;
    session_id:    string;
    card_detail:   Card_detail;
    accounting_date: string;
    transaction_date: string;
    authorization_code: string;
    payment_type_code: string;
    response_code:  number;
    installments_number: number;
}

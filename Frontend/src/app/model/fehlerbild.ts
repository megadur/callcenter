export class Fehlerbild {
    constructor(public ID: number=0 ) { }
    ;
    public BILDNUMMER: String="";
    public FLT_SO_TYPE_ID: String="";
    public FLT_STATUS: String="";
    public FLT_SPECIAL_ORDER_FLAG_ID: String="";
    public FLT_INC_TEXT_SHORT: String="";
    public FLT_INC_TEXT_LONG: String="";
    public FLT_CODE_INT: String="";
    public FLT_TEXT_INT: String="";
    public FLT_CODE_EXT: String="";
    public FLT_TEXT_EXT: String="";
    public FLT_SYS: String="";
    public FLT_TASK: String="";
    public FLT_HANDLING: String="";
    public STATUS: String="";
    public PRIO: String="";
    public SYMPTOM: String="";
    public LOESUNG: String="";
    public AUSLOESER: String="";
    public BESCHREIBUNG: String="";
    public ERSTELLT_TS: Date;
    public GEAENDERT_TS: Date;
}

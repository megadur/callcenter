<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:zpi="my:ZPI" version="1.0">
    <xsl:output omit-xml-declaration="yes" indent="yes"/>
    <xsl:strip-space elements="*"/>

    <zpi:codes>
        <code key="tlnr" value="ACCOUNT.TO_NR"/>
        <code key="mbnr" value="?"/>
        <code key="syst" value="ACCOUNT.SYSTEL"/>
        <code key="einr" value="aktuelles Systemdatum"/>
        <code key="prla" value="?"/>
        <code key="p016" value="Hauptnutzer"/>
        <code key="f482" value="?"/>
        <code key="cfdm" value="'CVSE'"/>
        <code key="anre" value="ANSCHRIFT.ANRE"/>
        <code key="name" value="ANSCHRIFT.NAME"/>
        <code key="zusa" value="ANSCHRIFT.ZUSA"/>
        <code key="stra" value="ANSCHRIFT.STRA"/>
        <code key="plz" value="ANSCHRIFT.PLZ"/>
        <code key="ort" value="ANSCHRIFT.ORT"/>
        <code key="fkto" value="ANSCHRIFT.GRUS"/>
        <code key="coco" value="ANSCHRIFT.LKZ"/>
        <code key="kdnr" value="ACCOUNT.KDNR"/>
        <code key="ask" value="aktAccessId"/>
        <code key="upwd" value="aktAccessPwd"/>
        <code key="add" value="/service/itv2/login"/>
        <code key="f553" value="One-time-password for authentication required"/>
        <code key="pwd6" value="AVS-PIN"/>
        <code key="p001" value="Maximal age level of the content"/>
        <code key="p030" value="Secret question for avs-pin recovery"/>
        <code key="p031" value="Secret answer for avs-pin recovery"/>
        <code key="p038" value="T-Mobile subscriber-ID"/>
        <code key="p049" value="AVS registered mobile phone number"/>
        <code key="ask" value="CREDENTIAL.ACC_ID"/>
        <code key="upwd" value="CREDENTIAL.ACC_PWD"/>
        <code key="cgid" value="ISI_SET_NUMBERS"/>
        <code key="caid" value="Service-Order-ID "/>
        <code key="crin" value="ISI#"/>
        <code key="p093" value="statische IP-Adresse "/>
        <code key="p094" value="statische IP-Adresse "/>
        <code key="p095" value="statische IP-Adresse "/>
        <code key="p096" value="statische IP-Adresse "/>
        <code key="p097" value="statische IP-Adresse "/>
        <code key="p098" value="statische IP-Adresse "/>
        <code key="cgid" value="Auftragsart"/>
        <code key="caid" value="Auftragsnummer"/>
        <code key="crin " value="Routing Info"/>
        <code key="aliatypeall" value="?"/>
        <code key="nall" value="?"/>
        <code key="" value=""/>
        <code key="" value=""/>
        <code key="" value=""/>
        <code key="" value=""/>
        <code key="" value=""/>
        
        
    </zpi:codes>

    <xsl:key name="kCodeByName" match="code" use="@key"/>
    <xsl:template match="node()|@*" mode="ZPI">
        
        <xsl:apply-templates select="node()|@*"  mode="ZPI" />
    </xsl:template>
    <xsl:template match="text()[document('')/*/zpi:codes/*/@key]" mode="ZPI">
        <xsl:variable name="vCur" select="."/>
        
        <xsl:for-each select="document('')">
           <xsl:value-of select="key('kCodeByName', $vCur)/@value"/><br/>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>

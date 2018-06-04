<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:em="my:EM"
	xmlns:emr="my:EMR"
	xmlns:lsi="my:LSI"
	>
	<xsl:import href="mpcode.xsl"/>
	<xsl:import href="emcode.xsl"/>
	<xsl:import href="lsicode.xsl"/>
	<xsl:output method="html" version="4.0" indent="yes" encoding="ISO-8859-1"
		media-type="text/html"/>
	<xsl:template match="/order_isi">
		<html>
			<head>
				<title>CRM Order <xsl:value-of select="kopfdaten/crm_auftragsnr"/></title>
				<style type="text/css">
					h1{
					    border-bottom:4px double black;
					    padding-bottom:20px;
					    margin:0px;
					}
					
					h2{
					    margin:0px;
					    padding-top:40px;
					}
					
					h3{
					    margin:0px;
					    padding-top:40px;
					}
					
					p{
					    line-height:150%;
					}
					
					body{
					    font-family:Tahoma, Helvetica, sans-serif;
					}
					
					table, tr, td{
					    margin:0px;
					    padding:0px;
					    border:1px solid #f0f0f0;
					    border-collapse:collapse;
					}
					
					.rgbHeadKey{
					    background-color:#C4E090;
					}
					.rgbHeadVal{
					    background-color:#DDD2EB;
					}
					.rgbHeadAns{
					    background-color:#f0f0f0;
					}
					.rgbSvc{
					    background-color:#FFDBDB;
					}
					.rgbStd{
					    background-color:#C2C2C2;
					}
					.rgbGf001{
					    background-color:#FFcccc;
					}
					.rgbGf002{
					    background-color:#ccFFcc;
					}
					.rgbGf003{
					    background-color:#ccccFF;
					}
					.rgbEgf001{
					    background-color:#FFC697;
					}
					.rgbEgf002{
					background-color:#FFFFCC;
					}
					.rgbCmt{
					background-color:#F8F8F8;
					font-color: #080808;
					}
					.rgbCmtSmall{
					font-size:10px;
					background-color:#F8F8F8;
					font-color: #080808;
					}
				</style>
			</head>
			<body>
				<h2>CRM Order ID <xsl:value-of select="kopfdaten/crm_auftragsnr"/></h2>
				<table>
					<colgroup>
						<col width="50px" />
						<col width="50px"/>
						<col width="100px"/>
						<col width="auto" />
						<col width="auto" />
					</colgroup>
					
					<tr>
						<th>GF</th>
						<th>EGF</th>
						<th>EM</th>
						<th>EM Name</th>
						<tr>Rule</tr>
					</tr>
					<xsl:apply-templates select="/order_isi/gfpos_isi/komponente_isi/em_mat_nr" mode="EM"/>
				</table>
				<xsl:apply-templates select="kopfdaten"/>
				<xsl:apply-templates select="gfpos_isi"/>
				<xsl:apply-templates select="bng_felder"/>
				<xsl:apply-templates select="anschluss"/>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="mp_mat_nr">
		mp_mat_nr: <xsl:value-of select="."/><br/>
		<xsl:apply-templates select="mp_mat_nr" mode="MP">
			<xsl:sort select="."/>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template match="gfpos_isi|gfpos_as">
		<h4>
			<xsl:value-of select="name()"/>:=
			<xsl:call-template name="comment">
				<xsl:with-param name="text">
					<xsl:value-of select="comment()"/>
				</xsl:with-param>
			</xsl:call-template>
		</h4>
		<table width="auto" >
			<colgroup>
				<col width="100px"/>
				<col width="200px"/>
				<col width="300px"/>
				<col width="120px"/>
			</colgroup>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>gf</td>
				<td><xsl:value-of select="gf"/></td>			
				<td></td>			
				<td></td>			
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>egf</td>
				<td><xsl:value-of select="egf"/></td>			
				<td></td>			
				<td></td>			
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>MP-Nr</td>
				<td><xsl:value-of select="komponente_isi/mp_mat_nr|mp_mat_nr"/></td>			
				<td></td>			
				<td></td>			
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>EM-Nr</td>
				<td><xsl:value-of select="(komponente_isi|komponente_as)/em_mat_nr" /></td>			
				<td></td>			
				<td></td>			
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>KWT</td>
				<td><xsl:value-of select="kwtdate"/></td>			
				<td></td>			
				<td></td>			
			</tr>
		</table>
		<xsl:variable name="color">
			<xsl:choose>
				<xsl:when test="egf=001">
					rgbEgf001
				</xsl:when>
				<xsl:when test="egf=002">
					rgbEgf002
				</xsl:when>
				<xsl:otherwise>
					rgbStd
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<table width="100%" >
			<colgroup>
				<col width="100px" class="{$color}"/>
				<col width="200px"/>
				<col width="300px" class="rgbCmt"/>
				<col width="30px" class="rgbCmt"/>
				<col width="60px" class="rgbCmt"/>
				<col width="30px" class="rgbCmt"/>
			</colgroup>
			<xsl:apply-templates select="(komponente_isi|komponente_as)/LSI-Container"/>
		</table>
	</xsl:template>
	<xsl:template match="komponente_isi/LSI-Container">
		<tr>
			<td >
				<xsl:value-of select="Attribut-ID"/>
			</td>
			<td >
				<xsl:value-of select="LSI-Wert"/>
			</td>
			<xsl:apply-templates select="Attribut-ID"/>
		</tr>
	</xsl:template>
	<xsl:template match="komponente_as/LSI-Container">
		<tr>
			<td >
				<xsl:value-of select="Attribut-ID"/>
			</td>
			<td >
				<xsl:value-of select="LSI-Wert"/>
			</td>
			<xsl:apply-templates select="Attribut-ID"/>
		</tr>
	</xsl:template>
	<xsl:template match="kopfdaten">
		<table width="auto" >
			<colgroup>
				<col width="300px"/>
				<col width="300px"/>
			</colgroup>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>order_no</td>
				<td>
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:value-of select="order_no"/>
				</td>
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>serial_no</td>
				<td >
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:value-of select="serial_no"/>
				</td>
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>crm_auftragsnr</td>
				<td >
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:value-of select="crm_auftragsnr"/>
				</td>
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>adresse</td>
				<td >
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:apply-templates select="../gfpos_isi[1]/kundendaten/wohnanschrift"/>
				</td>
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>kundennummer</td>
				<td >
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:value-of select="../gfpos_isi/kundendaten/tcom-kundennr"/>
				</td>
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>bkto</td>
				<td bgcolor="#f0f0f0">
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:value-of select="../gfpos_isi/kundendaten/bkto"/>
				</td>
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>to-nummer</td>
				<td bgcolor="#f0f0f0">
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:value-of select="../gfpos_isi/kundendaten/to-nummer"/>
				</td>
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>area-code</td>
				<td >
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:value-of
						select="../gfpos_isi/komponente_isi[em_mat_nr=88218782]/LSI-Container[Attribut-ID=89]/LSI-Wert"
					/>
				</td>
			</tr>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>msn1</td>
				<td >
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:value-of
						select="../gfpos_isi/komponente_isi[em_mat_nr=88218782]/LSI-Container[Attribut-ID=1]/LSI-Wert"
					/>
				</td>
			</tr>
			<xsl:variable name="name" select="../gfpos_isi/komponente_isi[em_mat_nr=88216906]/LSI-Container[Attribut-ID=4]/LSI-Wert">			
			</xsl:variable>
			<xsl:if test="$name!=''">			
				<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>msn2</td>
				<td >
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:value-of
						select="$name"
					/>
				</td>
			</tr>
			</xsl:if>
			<tr>
				<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>msn3</td>
				<td >
					<xsl:attribute name="class">rgbHeadVal</xsl:attribute>
					<xsl:value-of
						select="../gfpos_isi/komponente_isi[em_mat_nr=88216906]/LSI-Container[Attribut-ID=5]/LSI-Wert"
					/>
				</td>
			</tr>
		</table>
	</xsl:template>
	<xsl:template match="wohnanschrift">
		<table width="auto">
			<xsl:for-each select="*">
				<tr>
					<td>
						<xsl:attribute name="class">rgbHeadAns</xsl:attribute>
						<xsl:value-of select="name(.)"/>
					</td>
					<td >
						<xsl:value-of select="."/>
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
	<xsl:template name="comment">
		<xsl:param name="text" select="'left'"/>
		<i>
			<xsl:value-of select="$text"/>
		</i>
	</xsl:template>

	<xsl:template match="anschluss">
		<h3>anschluss:<xsl:value-of select="AuftragsDelta_isp"/></h3>
		<h4>
			<xsl:call-template name="comment">
				<xsl:with-param name="text">
					<xsl:value-of select="comment()"/>
				</xsl:with-param>
			</xsl:call-template>
		</h4>
		<xsl:apply-templates select="gfpos_as" />
		<xsl:apply-templates select="komponente_as/em_mat_nr" mode="EM"/>
		<xsl:apply-templates select="komponente_as/mp_mat_nr" mode="MP"/>
	
		<xsl:variable name="color">
			<xsl:choose>
				<xsl:when test="egf=001">
					rgbEgf001
				</xsl:when>
				<xsl:when test="egf=002">
					rgbEgf002
				</xsl:when>
				<xsl:otherwise>
					rgbStd
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<table width="auto" >
			<colgroup>
				<col width="100px" class="{$color}"/>
				<col width="200px"/>
				<col width="300px" class="rgbCmt"/>
			</colgroup>
			<xsl:apply-templates select="komponente_as/LSI-Container"/>
		</table>
	</xsl:template>
	
	<xsl:template match="bng_felder">
		<h3>bng_felder:</h3>
		<h4>
			<xsl:call-template name="comment">
				<xsl:with-param name="text">
					<xsl:value-of select="comment()"/>
				</xsl:with-param>
			</xsl:call-template>
		</h4>
		
		<xsl:variable name="color">
			<xsl:choose>
				<xsl:when test="egf=001">
					rgbEgf001
				</xsl:when>
				<xsl:when test="egf=002">
					rgbEgf002
				</xsl:when>
				<xsl:otherwise>
					rgbStd
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<table width="auto">
			<colgroup>
				<col width="300px" class="rgbEgf001"/>
				<col width="300px"/>
			</colgroup>
			<xsl:for-each select="*">
				<tr>
					<td>
						<xsl:attribute name="class">rgbHeadAns</xsl:attribute>
						<xsl:value-of select="name(.)"/>
					</td>
					<td >
						<xsl:value-of select="."/>
					</td>
					<td></td>
				</tr>
			</xsl:for-each>
		</table>
		</xsl:template>
</xsl:stylesheet>

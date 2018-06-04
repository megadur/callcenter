<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:em="my:EM"
	xmlns:lsi="my:LSI"
	xmlns:zpi="my:ZPI"
	xmlns:prov="http://zpi.telekom.com/Types/ZPIProvisioning/v2"
	xmlns:info="http://zpi.telekom.com/Types/ZPIInformation/v1"
	xmlns:pass="http://zpi.telekom.com/Types/ZPIPasswordHandling/v1"
	
	xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"
	xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
	>
	<xsl:import href="emcode.xsl"/>
	<xsl:import href="zpicode.xsl"/>
	
	<xsl:output method="html" version="4.0" indent="yes" encoding="ISO-8859-1"
		media-type="text/html"/>
	<!-- 
		/soap:Envelope/soap:Body[1]/*[namespace-uri()='http://zpi.telekom.com/Types/ZPIProvisioning/v2' and local-name()='createAccount'][1]
		-->
	<xsl:template match="/">
		<html>
			<head>
				<title>ZPI Call from <xsl:value-of select="//wsse:Username"/></title>
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
				</style>
			</head>
			<body>
				<h2>ZPI Call from <xsl:value-of select="//wsse:Username"/></h2>
				<table width="auto" >
					<colgroup>
						<col width="100px"/>
						<col width="300px"/>
						<col width="120px"/>
					</colgroup>
					<xsl:apply-templates select="//soap:Body" />
					
				</table>
			</body>
		</html>
	</xsl:template>
	<!-- prov:createAccount|prov:updateAccoun|prov:deactivateAccount -->
	<xsl:template match="//soap:Body">
		<tr>
			<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>contributor</td>
			<td><xsl:value-of select="*/prov:contributor/prov:contributorReference"/></td>			
			<td></td>			
		</tr>
		<tr>
			<td><xsl:attribute name="class">rgbHeadKey</xsl:attribute>account</td>
			<td><xsl:value-of select="*/prov:account/prov:id"/></td>			
			<td></td>			
		</tr>		
		
		<xsl:apply-templates select="*/prov:keyValueLists"/>
		<xsl:apply-templates select="*/info:keyLists"/>
		<xsl:apply-templates select="*/prov:emLists"/>
		<xsl:apply-templates select="*"/>		
	</xsl:template>
	
	<xsl:template name="comment">
		<xsl:param name="text" select="'left'"/>
		<i>
			<xsl:value-of select="$text"/>
		</i>
	</xsl:template>
	
	<xsl:template match="prov:keyValueListX">
		<h3><xsl:value-of select="name(..)"/>:</h3>
		<h4>
			<xsl:call-template name="comment">
				<xsl:with-param name="text">
					<xsl:value-of select="comment()"/>
				</xsl:with-param>
			</xsl:call-template>
		</h4>
		
		<table width="auto">
			<colgroup>
				<col width="300px" class="rgbEgf001"/>
				<col width="300px"/>
			</colgroup>
			<xsl:for-each select="*">
				<tr>
					<td>
						<xsl:attribute name="class">rgbHeadAns</xsl:attribute>
						<xsl:value-of select="prov:key"/>
					</td>
					<td >
						<xsl:value-of select="prov:value"/>
					</td>
					<td></td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
	
	<xsl:template match="prov:keyList|prov:keyValueList">
		<h3><xsl:value-of select="name(..)"/>:</h3>
		
		<table width="auto">
			<colgroup>
				<col width="120px" class="rgbHeadKey"/>
				<col width="500px" class="rgbEgf001"/>
				<col width="200px" class="rgbCmt"/>
			</colgroup>
			<th>
				<tr>
					<td>Key</td>
					<td>Value</td>
					<td>Content</td>
				</tr>
			</th>
			<xsl:for-each select="*">
				<tr>
					<td>
						<xsl:attribute name="class">rgbHeadAns</xsl:attribute>
						<xsl:value-of select="prov:key"/>
					</td>
					<td >
						<xsl:value-of select="prov:value"/>
					</td>
					<td>
						<xsl:apply-templates select="prov:key" mode="ZPI"/>										
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
	<xsl:template match="info:keyValueList">
		<h3><xsl:value-of select="name(..)"/>:</h3>
		
		<table width="auto">
			<colgroup>
				<col width="300px" class="rgbHeadKey"/>
				<col width="300px" class="rgbHeadVal"/>
				<col width="300px" class="rgbCmt"/>
			</colgroup>
			<xsl:for-each select="*">
				<tr>
					<td>
						<xsl:attribute name="class">rgbHeadAns</xsl:attribute>
						<xsl:value-of select="info:key"/>
					</td>
					<td >
						<xsl:value-of select="info:value"/>
					</td>
					<td>
						<xsl:apply-templates select="prov:key" mode="ZPI"/>						
						
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
	<xsl:template match="info:keyList">
		<h3><xsl:value-of select="name(..)"/>:</h3>
		
		<table width="auto">
			<colgroup>
				<col width="100px" class="rgbHeadKey"/>
				<col width="300px" class="rgbCmt"/>
			</colgroup>
			<th>
				<tr>
					<td>Key</td>
					<td>Content</td>
				</tr>
			</th>
			
			<xsl:for-each select="*">
				<tr>
					<td>
						<xsl:attribute name="class">rgbHeadAns</xsl:attribute>
						<xsl:value-of select="."/>
					</td>
					<td >
						<xsl:apply-templates select="prov:key" mode="ZPI"/>										
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
	<xsl:template match="prov:emList">
		<h3>EM Liste:</h3>
		<h4>
			<xsl:call-template name="comment">
				<xsl:with-param name="text">
					<xsl:value-of select="comment()"/>
				</xsl:with-param>
			</xsl:call-template>
		</h4>
		
		<table width="auto">
			<colgroup>
				<col width="100px" class="rgbHeadKey"/>
				<col width="300px" class="rgbHeadVal"/>
				<col width="100px" class="rgbCmt"/>
				<col width="300px" class="rgbEgf001"/>
			</colgroup>
			<tr>
				<td>Key</td>
				<td>Value</td>
				<td>Content</td>
				<td>INID</td>
			</tr>
			<xsl:for-each select="*">
				<tr>
					<td>
						<xsl:attribute name="class">rgbHeadAns</xsl:attribute>
						<xsl:value-of select="prov:emMatNo"/>
					</td>
					<td >
						<xsl:apply-templates select="prov:emMatNo" mode="EM"/>						
					</td>
					<td >
						<xsl:value-of select="prov:contributorReferenceId"/>
					</td>
					<td>
						<xsl:value-of select="prov:inid"/>						
					</td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
	
</xsl:stylesheet>

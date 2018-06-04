<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
	version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"
	xmlns:csdg="http://schemas.telekom.net/csdg_v01.01"
	xmlns:inv="http://services.tdeu.telekom.net/ServAndResMgmt/InventoryMgmt/InventoryQueryConsumer_v01.00" 
	xmlns:typ="http://services.tdeu.telekom.net/ServAndResMgmt/InventoryMgmt/InventoryQueryConsumer_v01.00/types" 
	xmlns:bom="http://system-services.t-home.telekom.de/ServiceManagement/ServiceInventoryManagement/InventoryQuery_v01.00/types" 
	xmlns:ois="http://system-services.t-home.telekom.de/ServiceManagement/OIS_Services_v01.00/common"
	exclude-result-prefixes="bom ois typ csdg soapenv xsl"	
	>
	
	<xsl:output method="html" version="4.0" indent="yes" encoding="UTF-8" media-type="text/xhtml" ></xsl:output>
	<!-- doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"-->	
	<xsl:template match="/">
		<xsl:apply-templates select="/soapenv:Envelope/soapenv:Body//bom:query"/>
		<xsl:apply-templates select="/soapenv:Envelope/soapenv:Body//bom:diagnostic"/>
		<xsl:apply-templates select="/soapenv:Envelope/soapenv:Body//bom:productionPlan"/>
		<xsl:apply-templates select="/soapenv:Envelope/soapenv:Body//bom:query"/>
		<xsl:apply-templates select="/soapenv:Envelope/soapenv:Body//bom:incident"/>
		<xsl:apply-templates select="/soapenv:Envelope/soapenv:Body//bom:OISException"/>
	</xsl:template>
	
	<!-- level 1: productionPlan -->

	<xsl:template match="bom:query|bom:OISException">
		<html>
			<head>
				<title>OIS:<xsl:value-of select="local-name(..)"/></title>
				<style type="text/css">
					h1{
					    border-bottom:4px double black;
					    padding-bottom:20px;
					    margin:0px;
					    color: rgb(226,0,116);
					}
					h2{
					    margin:0px;
					    padding-top:40px;
					    color: rgb(226,0,116);
					}
					h3{
					    margin:0px;
					    padding-top:10px;
					}
					p{
					    line-height:150%;
					}
					body{
					    font-family:Tahoma, Helvetica, sans-serif;
					}
					table{
					    margin:0px;
					    padding:0px;
					    border:1px solid #f0f0f0;
					    border-collapse:collapse;
					};
					.rgbBI{background-color: #C4E090;}
					.rgbBII{background-color: #DDD2EB;}
					.rgbElm{background-color: #f0f0f0;}
					.rgbSvc{background-color: #FFDBDB;}
					.rgbSbc{background-color: #C2C2C2;}
					.rgbSbr{background-color: #FFC697;}
					.rgbVal{background-color: #FFFFFF;}
				.spc{
					    margin:10px;
					    padding:10px;
					    border:3px solid #C4E090;
					    background-color: 	#FAFAD2;
				}
				.svc{
					    margin:10px;
					    padding:10px;
					    border:3px solid #B4D080;
					    background-color: 		#EAEAC2;					    
				}
				.act{
					    margin:10px;
					    padding:10px;
					    border:3px solid #C490E0;
					    background-color: 		#E6E6FA ;					    
				}
				.hed{
					    margin:10px;
					    padding:10px;
					    border:3px solid #D0D0D0;
					    background-color: 		#F6F6F6 ;					    
				}
				.inf{
					    margin:10px;
					    padding:10px;
					    border:1px solid #D0D0D0;
					    
					    font-size: 12px;
				}
				</style>
			</head>
			<body>
				<a id="topOfPage"></a>
				<h1>
					<xsl:value-of select="local-name(..)"/>
					<xsl:if test="starts-with(local-name(..),'executeAction')">
						<xsl:text> </xsl:text>
						<i>(<xsl:value-of
								select="ois:businessInteractionItem/ois:specification[ois:characteristic/ois:characteristicValue='Action']/ois:specificationID"
							/>)</i>
					</xsl:if>
				</h1>
				<xsl:value-of select="../comment()"/>	
				<xsl:if test="not(../comment())">
					Test
				</xsl:if>
				<div  class="inv">
					<table class="inf" border="1">
					<tr bgcolor="silver">
						<th>Type</th>
						<th>BII</th>
						<th>State</th>
					</tr>
						<!-- RFS -->
						<xsl:for-each select="ois:businessInteractionItem[ois:service]">
							<xsl:sort select="./ois:specification/ois:specificationID"/>
							<tr>
								<td> RFS </td>
								<td>
									<a href="#{./ois:entityKey/ois:keyA}">
										<xsl:value-of select="./ois:specification/ois:specificationID"/>
									</a>
								</td>
								<td><xsl:value-of select="ois:state"/>
								</td>
							</tr>
						</xsl:for-each>
						<!-- TA -->
						<xsl:for-each select="ois:businessInteractionItem[not(ois:service)]">
							<xsl:sort select="./ois:specification/ois:specificationID"/>
							<tr>
								<td> TA </td>
								<td>
									<a href="#{./ois:entityKey/ois:keyA}">
										<xsl:value-of select="./ois:specification/ois:specificationID"/>
									</a>
								</td>
								<td><xsl:value-of select="ois:state"/>
								</td>
							</tr>
						</xsl:for-each>
					</table>
				</div>
				<h2><xsl:value-of select="ois:specification/ois:specificationID"/></h2>
				<div  class="hed">
					<table width="50%">
						<colgroup>
							<col width="25%" ></col>
							<col width="75%" ></col>
						</colgroup>
						
						<xsl:apply-templates select="ois:entityKey"/>
						<xsl:apply-templates select="ois:state"/>
						<xsl:apply-templates select="ois:specification"/>
						
					</table>
					<table width="100%">
						<colgroup>
							<col width="25%" ></col>
							<col width="75%" ></col>
						</colgroup>		
						<xsl:apply-templates select="ois:characteristic"/>
					</table>
				</div>
				<div  class="spc">
				<h2>Services</h2>
				<xsl:apply-templates
					select="ois:businessInteractionItem[ois:service]"/>
				</div>
				<div  class="act">
				<h2>Actions</h2>
				<xsl:apply-templates
					select="ois:businessInteractionItem[not(ois:service)]"/>
				</div>
			</body>
		</html>
	</xsl:template>
	<!-- level 2: businessInteractionItem -->
	<xsl:template match="bom:OISExceptionX">
		<h3>
			<xsl:value-of select="./ois:specification/ois:specificationID"/>			
		</h3>
		<table width="50%">
			<colgroup>
				<col width="25%" ></col>
				<col width="75%" ></col>
			</colgroup>
			
			<xsl:apply-templates select="ois:entityKey"/>
			<xsl:apply-templates select="ois:state"/>
		</table>
		
		<xsl:apply-templates select="ois:specification"/>
	</xsl:template>
	<xsl:template match="ois:businessInteractionItem">
		<a name="{./ois:entityKey/ois:keyA}" href="#topOfPage">goto top</a>
		<h3>
			<xsl:value-of select="./ois:specification/ois:specificationID"/>
		</h3>
		<table width="50%">
			<colgroup>
				<col width="25%" ></col>
				<col width="75%" ></col>
			</colgroup>
		
			<xsl:apply-templates select="ois:entityKey"/>
			<xsl:apply-templates select="ois:state"/>
		</table>
			
		<xsl:apply-templates select="ois:specification"/>
		<!-- 	 -->
		<xsl:apply-templates select="ois:service"/>
	</xsl:template>

	<!-- level 3: service -->
	<xsl:template match="ois:service">
		<div  class="svc">			
		<h3>
			<xsl:value-of select="./ois:specification/ois:specificationID"/>			
		</h3>
		<table width="50%">
			<colgroup>
				<col width="25%" ></col>
				<col width="75%" ></col>
			</colgroup>
			
			<xsl:apply-templates select="ois:entityKey"/>
			<xsl:apply-templates select="ois:state"/>
		</table>
		<xsl:apply-templates select="ois:specification"/>
		</div>		
	</xsl:template>
	<xsl:template match="ois:subscription">
		<xsl:apply-templates select="ois:specification"/>
		<xsl:apply-templates select="ois:subscriber"/>
	</xsl:template>

	<xsl:template match="ois:subscriber">
		<xsl:apply-templates select="ois:specification"/>
	</xsl:template>

	<!-- generic specification (table presentation) -->
	<xsl:template match="ois:entity">
		<table width="100%">
			<colgroup>
				<col width="25%" ></col>
				<col width="75%" ></col>
			</colgroup>
			<tr>
				<td > &#160;</td>
				<td > &#160;</td>
			</tr>
			<xsl:apply-templates select="ois:entityKey"/>
			<xsl:apply-templates select="../../ois:entityKey/ois:keyB"/>
			<xsl:apply-templates select="../../ois:state"/>
			
			<xsl:for-each select="ois:characteristic">
				<xsl:sort select="./ois:characteristic/ois:characteristicID"/>
				
				<xsl:apply-templates select="ois:characteristic"/>
			</xsl:for-each>
		</table>
	</xsl:template>
	
	<xsl:template match="ois:specification">
		<table width="100%">
			<colgroup>
				<col width="25%" ></col>
				<col width="75%" ></col>
			</colgroup>		
			<xsl:for-each select="ois:characteristic">
				<xsl:sort select="./ois:characteristicID"/>
				
				<xsl:apply-templates select="."/>
			</xsl:for-each>
		</table>
	</xsl:template>

	<xsl:template match="ois:characteristic">
		<tr>
			<td >
				<xsl:attribute name="class">rgbElm</xsl:attribute>
				<xsl:value-of select="ois:characteristicID"/>
			</td>
			<xsl:if test="count(ois:characteristicValue) = 1">
				<td >
					<xsl:attribute name="class">rgbVal</xsl:attribute>
					<xsl:if test="ois:characteristicID= 'keyA'">
						<xsl:if test="ancestor::ois:businessInteractionItem  ">
							<xsl:attribute name="class">rgbSvc</xsl:attribute>
						</xsl:if>
					</xsl:if>
					<xsl:choose>
						<xsl:when test="ois:characteristicID= 'RefBRequest'">
							for RefBRequest see HTML source
							<xsl:comment><xsl:value-of select="ois:characteristicValue"/></xsl:comment>							
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="ois:characteristicValue"/>
						</xsl:otherwise>
					</xsl:choose>
				</td>
			</xsl:if>
			<xsl:if test="count(ois:characteristicValue) > 1">
				<td>
					<table width="auto">
						<xsl:for-each select="ois:characteristicValue">
							<tr>
								<td >
									<xsl:attribute name="class">rgbVal</xsl:attribute>
									<xsl:value-of select="."/>									
								</td>
							</tr>
						</xsl:for-each>
					</table>
				</td>
			</xsl:if>
			<xsl:if test="count(ois:characteristic) > 0">
				<td>
					<table width="100%">
						<colgroup>
							<col width="25%"/>
							<col width="75%"/>
						</colgroup>
						<xsl:for-each select="ois:characteristic">
							<xsl:sort select="./ois:characteristicID"/>
							
							<xsl:apply-templates select="."/>
						</xsl:for-each>
					</table>
				</td>
			</xsl:if>
		</tr>
	</xsl:template>

	<xsl:template match="ois:entityKey">
		<tr>
			<td > keyA</td>
			<td > <xsl:value-of select="ois:keyA"/></td>
		</tr>
		<tr>
			<td > keyB</td>
			<td > <xsl:value-of select="ois:keyB"/></td>
		</tr>
	</xsl:template>
	
	<xsl:template match="ois:state">
		<tr>
			<td > state</td>
			<td > <xsl:value-of select="."/></td>
		</tr>
	</xsl:template>

</xsl:stylesheet>

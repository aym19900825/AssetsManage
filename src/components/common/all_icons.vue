<template>
<div>
	<EasyScrollbar>
        <div id="wrapper" ref="homePagess" style="height: 600px;">
          <div id="information" style="height: auto;">
			<div class="pl20 pr20">
				<h3>应用中心图标</h3>
				<el-row :gutter="30">
					<el-col :span="6"><span class="current"><i class="icon-correct1">icon-correct1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-date-limit1">icon-date-limit1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-date-limit">icon-date-limit</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow2-down">icon-arrow2-down</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow2-left">icon-arrow2-left</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow2-right">icon-arrow2-right</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow2-up">icon-arrow2-up</i></span></el-col>
					<el-col :span="6"><span><i class="icon-add">icon-add</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow1-down">icon-arrow1-down</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow1-left">icon-arrow1-left</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow1-right">icon-arrow1-right</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow1-up">icon-arrow1-up</i></span></el-col>
					<el-col :span="6"><span><i class="icon-back">icon-back</i></span></el-col>
					<el-col :span="6"><span><i class="icon-calendar1">icon-calendar1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-checkbox-focus">icon-checkbox-focus</i></span></el-col>
					<el-col :span="6"><span><i class="icon-checkbox-normal">icon-checkbox-normal</i></span></el-col>
					<el-col :span="6"><span><i class="icon-close1">icon-close1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-close2">icon-close2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-contract">icon-contract</i></span></el-col>
					<el-col :span="6"><span><i class="icon-data">icon-data</i></span></el-col>
					<el-col :span="6"><span><i class="icon-department">icon-department</i></span></el-col>
					<el-col :span="6"><span><i class="icon-device">icon-device</i></span></el-col>
					<el-col :span="6"><span><i class="icon-distribution">icon-distribution</i></span></el-col>
					<el-col :span="6"><span><i class="icon-edit">icon-edit</i></span></el-col>
					<el-col :span="6"><span><i class="icon-excel">icon-excel</i></span></el-col>
					<el-col :span="6"><span><i class="icon-file-normal">icon-file-normal</i></span></el-col>
					<el-col :span="6"><span><i class="icon-file-open">icon-file-open</i></span></el-col>
					<el-col :span="6"><span><i class="icon-file-text">icon-file-text</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inspection">icon-inspection</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inventory-line-callin">icon-inventory-line-callin</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inventory-line-callout">icon-inventory-line-callout</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inventory-line-code">icon-inventory-line-code</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inventory-line-grant">icon-inventory-line-grant</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inventory-line-inventory">icon-inventory-line-inventory</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inventory-line-requisition">icon-inventory-line-requisition</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inventory-line-return">icon-inventory-line-return</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inventory-line">icon-inventory-line</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inventory">icon-inventory</i></span></el-col>
					<el-col :span="6"><span><i class="icon-key">icon-key</i></span></el-col>
					<el-col :span="6"><span><i class="icon-kpi">icon-kpi</i></span></el-col>
					<el-col :span="6"><span><i class="icon-log">icon-log</i></span></el-col>
					<el-col :span="6"><span><i class="icon-login-log">icon-login-log</i></span></el-col>
					<el-col :span="6"><span><i class="icon-map">icon-map</i></span></el-col>
					<el-col :span="6"><span><i class="icon-maximization">icon-maximization</i></span></el-col>
					<el-col :span="6"><span><i class="icon-menu1">icon-menu1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-menu2">icon-menu2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-menu3">icon-menu3</i></span></el-col>
					<el-col :span="6"><span><i class="icon-minimize">icon-minimize</i></span></el-col>
					<el-col :span="6"><span><i class="icon-monitor">icon-monitor</i></span></el-col>
					<el-col :span="6"><span><i class="icon-next">icon-next</i></span></el-col>
					<el-col :span="6"><span><i class="icon-notice">icon-notice</i></span></el-col>
					<el-col :span="6"><span><i class="icon-order-down">icon-order-down</i></span></el-col>
					<el-col :span="6"><span><i class="icon-order-normal">icon-order-normal</i></span></el-col>
					<el-col :span="6"><span><i class="icon-order-up">icon-order-up</i></span></el-col>
					<el-col :span="6"><span><i class="icon-pdf">icon-pdf</i></span></el-col>
					<el-col :span="6"><span><i class="icon-plan">icon-plan</i></span></el-col>
					<el-col :span="6"><span><i class="icon-ppt">icon-ppt</i></span></el-col>
					<el-col :span="6"><span><i class="icon-preventive">icon-preventive</i></span></el-col>
					<el-col :span="6"><span><i class="icon-previous">icon-previous</i></span></el-col>
					<el-col :span="6"><span><i class="icon-print">icon-print</i></span></el-col>
					<el-col :span="6"><span><i class="icon-project">icon-project</i></span></el-col>
					<el-col :span="6"><span><i class="icon-purchase">icon-purchase</i></span></el-col>
					<el-col :span="6"><span><i class="icon-radio-focus">icon-radio-focus</i></span></el-col>
					<el-col :span="6"><span><i class="icon-radio-normal">icon-radio-normal</i></span></el-col>
					<el-col :span="6"><span><i class="icon-refresh">icon-refresh</i></span></el-col>
					<el-col :span="6"><span><i class="icon-reporting">icon-reporting</i></span></el-col>
					<el-col :span="6"><span><i class="icon-restore">icon-restore</i></span></el-col>
					<el-col :span="6"><span><i class="icon-role-site">icon-role-site</i></span></el-col>
					<el-col :span="6"><span><i class="icon-safe">icon-safe</i></span></el-col>
					<el-col :span="6"><span><i class="icon-search">icon-search</i></span></el-col>
					<el-col :span="6"><span><i class="icon-start">icon-start</i></span></el-col>
					<el-col :span="6"><span><i class="icon-stop">icon-stop</i></span></el-col>
					<el-col :span="6"><span><i class="icon-task">icon-task</i></span></el-col>
					<el-col :span="6"><span><i class="icon-time">icon-time</i></span></el-col>
					<el-col :span="6"><span><i class="icon-trash">icon-trash</i></span></el-col>
					<el-col :span="6"><span><i class="icon-user">icon-user</i></span></el-col>
					<el-col :span="6"><span><i class="icon-word">icon-word</i></span></el-col>
					<el-col :span="6"><span><i class="icon-wordbook">icon-wordbook</i></span></el-col>
					<el-col :span="6"><span><i class="icon-worklist">icon-worklist</i></span></el-col>
					<el-col :span="6"><span><i class="icon-attachments">icon-attachments</i></span></el-col>
					<el-col :span="6"><span><i class="icon-book">icon-book</i></span></el-col>
					<el-col :span="6"><span><i class="icon-check">icon-check</i></span></el-col>
					<el-col :span="6"><span><i class="icon-correct">icon-correct</i></span></el-col>
					<el-col :span="6"><span><i class="icon-hot">icon-hot</i></span></el-col>
					<el-col :span="6"><span><i class="icon-list">icon-list</i></span></el-col>
					<el-col :span="6"><span><i class="icon-man">icon-man</i></span></el-col>
					<el-col :span="6"><span><i class="icon-move">icon-move</i></span></el-col>
					<el-col :span="6"><span><i class="icon-new">icon-new</i></span></el-col>
					<el-col :span="6"><span><i class="icon-question">icon-question</i></span></el-col>
					<el-col :span="6"><span><i class="icon-woman">icon-woman</i></span></el-col>
					<el-col :span="6"><span><i class="icon-activity">icon-activity</i></span></el-col>
					<el-col :span="6"><span><i class="icon-airplay">icon-airplay</i></span></el-col>
					<el-col :span="6"><span><i class="icon-alert-circle">icon-alert-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-alert-octagon">icon-alert-octagon</i></span></el-col>
					<el-col :span="6"><span><i class="icon-alert-triangle">icon-alert-triangle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-align-center">icon-align-center</i></span></el-col>
					<el-col :span="6"><span><i class="icon-align-justify">icon-align-justify</i></span></el-col>
					<el-col :span="6"><span><i class="icon-align-left">icon-align-left</i></span></el-col>
					<el-col :span="6"><span><i class="icon-align-right">icon-align-right</i></span></el-col>
					<el-col :span="6"><span><i class="icon-anchor">icon-anchor</i></span></el-col>
					<el-col :span="6"><span><i class="icon-archive">icon-archive</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-down-circle">icon-arrow-down-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-down-left">icon-arrow-down-left</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-down-right">icon-arrow-down-right</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-down">icon-arrow-down</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-left-circle">icon-arrow-left-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-left">icon-arrow-left</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-right-circle">icon-arrow-right-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-right">icon-arrow-right</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-up-circle">icon-arrow-up-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-up-left">icon-arrow-up-left</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-up-right">icon-arrow-up-right</i></span></el-col>
					<el-col :span="6"><span><i class="icon-arrow-up">icon-arrow-up</i></span></el-col>
					<el-col :span="6"><span><i class="icon-at-sign">icon-at-sign</i></span></el-col>
					<el-col :span="6"><span><i class="icon-award">icon-award</i></span></el-col>
					<el-col :span="6"><span><i class="icon-bar-chart-2">icon-bar-chart-2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-bar-chart">icon-bar-chart</i></span></el-col>
					<el-col :span="6"><span><i class="icon-battery-charging">icon-battery-charging</i></span></el-col>
					<el-col :span="6"><span><i class="icon-battery">icon-battery</i></span></el-col>
					<el-col :span="6"><span><i class="icon-bell-off">icon-bell-off</i></span></el-col>
					<el-col :span="6"><span><i class="icon-bell">icon-bell</i></span></el-col>
					<el-col :span="6"><span><i class="icon-bluetooth">icon-bluetooth</i></span></el-col>
					<el-col :span="6"><span><i class="icon-bold">icon-bold</i></span></el-col>
					<el-col :span="6"><span><i class="icon-book-open">icon-book-open</i></span></el-col>
					<el-col :span="6"><span><i class="icon-book2">icon-book2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-bookin">icon-bookin</i></span></el-col>
					<el-col :span="6"><span><i class="icon-bookmark">icon-bookmark</i></span></el-col>
					<el-col :span="6"><span><i class="icon-box">icon-box</i></span></el-col>
					<el-col :span="6"><span><i class="icon-briefcase">icon-briefcase</i></span></el-col>
					<el-col :span="6"><span><i class="icon-calendar">icon-calendar</i></span></el-col>
					<el-col :span="6"><span><i class="icon-camera-off">icon-camera-off</i></span></el-col>
					<el-col :span="6"><span><i class="icon-camera">icon-camera</i></span></el-col>
					<el-col :span="6"><span><i class="icon-cast">icon-cast</i></span></el-col>
					<el-col :span="6"><span><i class="icon-check-circle">icon-check-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-check-square">icon-check-square</i></span></el-col>
					<el-col :span="6"><span><i class="icon-checkout">icon-checkout</i></span></el-col>
					<el-col :span="6"><span><i class="icon-clipboard">icon-clipboard</i></span></el-col>
					<el-col :span="6"><span><i class="icon-clock">icon-clock</i></span></el-col>
					<el-col :span="6"><span><i class="icon-cloud-drizzle">icon-cloud-drizzle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-cloud-lightning">icon-cloud-lightning</i></span></el-col>
					<el-col :span="6"><span><i class="icon-cloud-off">icon-cloud-off</i></span></el-col>
					<el-col :span="6"><span><i class="icon-cloud-rain">icon-cloud-rain</i></span></el-col>
					<el-col :span="6"><span><i class="icon-cloud-snow">icon-cloud-snow</i></span></el-col>
					<el-col :span="6"><span><i class="icon-cloud">icon-cloud</i></span></el-col>
					<el-col :span="6"><span><i class="icon-code">icon-code</i></span></el-col>
					<el-col :span="6"><span><i class="icon-codepen">icon-codepen</i></span></el-col>
					<el-col :span="6"><span><i class="icon-command">icon-command</i></span></el-col>
					<el-col :span="6"><span><i class="icon-compass">icon-compass</i></span></el-col>
					<el-col :span="6"><span><i class="icon-copy">icon-copy</i></span></el-col>
					<el-col :span="6"><span><i class="icon-corner-down-left">icon-corner-down-left</i></span></el-col>
					<el-col :span="6"><span><i class="icon-corner-down-right">icon-corner-down-right</i></span></el-col>
					<el-col :span="6"><span><i class="icon-corner-left-down">icon-corner-left-down</i></span></el-col>
					<el-col :span="6"><span><i class="icon-corner-left-up">icon-corner-left-up</i></span></el-col>
					<el-col :span="6"><span><i class="icon-corner-right-down">icon-corner-right-down</i></span></el-col>
					<el-col :span="6"><span><i class="icon-corner-right-up">icon-corner-right-up</i></span></el-col>
					<el-col :span="6"><span><i class="icon-corner-up-left">icon-corner-up-left</i></span></el-col>
					<el-col :span="6"><span><i class="icon-corner-up-right">icon-corner-up-right</i></span></el-col>
					<el-col :span="6"><span><i class="icon-cpu">icon-cpu</i></span></el-col>
					<el-col :span="6"><span><i class="icon-credit-card">icon-credit-card</i></span></el-col>
					<el-col :span="6"><span><i class="icon-crop">icon-crop</i></span></el-col>
					<el-col :span="6"><span><i class="icon-crosshair">icon-crosshair</i></span></el-col>
					<el-col :span="6"><span><i class="icon-dashboard">icon-dashboard</i></span></el-col>
					<el-col :span="6"><span><i class="icon-database">icon-database</i></span></el-col>
					<el-col :span="6"><span><i class="icon-delete">icon-delete</i></span></el-col>
					<el-col :span="6"><span><i class="icon-double-angle-down">icon-double-angle-down</i></span></el-col>
					<el-col :span="6"><span><i class="icon-double-angle-left">icon-double-angle-left</i></span></el-col>
					<el-col :span="6"><span><i class="icon-double-angle-right">icon-double-angle-right</i></span></el-col>
					<el-col :span="6"><span><i class="icon-double-angle-up">icon-double-angle-up</i></span></el-col>
					<el-col :span="6"><span><i class="icon-download-cloud">icon-download-cloud</i></span></el-col>
					<el-col :span="6"><span><i class="icon-download">icon-download</i></span></el-col>
					<el-col :span="6"><span><i class="icon-droplet">icon-droplet</i></span></el-col>
					<el-col :span="6"><span><i class="icon-edit-3">icon-edit-3</i></span></el-col>
					<el-col :span="6"><span><i class="icon-edit2">icon-edit2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-envelope">icon-envelope</i></span></el-col>
					<el-col :span="6"><span><i class="icon-external-link">icon-external-link</i></span></el-col>
					<el-col :span="6"><span><i class="icon-eye-off">icon-eye-off</i></span></el-col>
					<el-col :span="6"><span><i class="icon-eye">icon-eye</i></span></el-col>
					<el-col :span="6"><span><i class="icon-fast-forward">icon-fast-forward</i></span></el-col>
					<el-col :span="6"><span><i class="icon-file-minus">icon-file-minus</i></span></el-col>
					<el-col :span="6"><span><i class="icon-file-plus">icon-file-plus</i></span></el-col>
					<el-col :span="6"><span><i class="icon-file-text1">icon-file-text1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-file">icon-file</i></span></el-col>
					<el-col :span="6"><span><i class="icon-film">icon-film</i></span></el-col>
					<el-col :span="6"><span><i class="icon-filter">icon-filter</i></span></el-col>
					<el-col :span="6"><span><i class="icon-flag">icon-flag</i></span></el-col>
					<el-col :span="6"><span><i class="icon-folder-minus">icon-folder-minus</i></span></el-col>
					<el-col :span="6"><span><i class="icon-folder-plus">icon-folder-plus</i></span></el-col>
					<el-col :span="6"><span><i class="icon-folder">icon-folder</i></span></el-col>
					<el-col :span="6"><span><i class="icon-gift">icon-gift</i></span></el-col>
					<el-col :span="6"><span><i class="icon-git-branch">icon-git-branch</i></span></el-col>
					<el-col :span="6"><span><i class="icon-git-commit">icon-git-commit</i></span></el-col>
					<el-col :span="6"><span><i class="icon-git-merge">icon-git-merge</i></span></el-col>
					<el-col :span="6"><span><i class="icon-git-pull-request">icon-git-pull-request</i></span></el-col>
					<el-col :span="6"><span><i class="icon-globe">icon-globe</i></span></el-col>
					<el-col :span="6"><span><i class="icon-grid">icon-grid</i></span></el-col>
					<el-col :span="6"><span><i class="icon-hard-drive">icon-hard-drive</i></span></el-col>
					<el-col :span="6"><span><i class="icon-hash">icon-hash</i></span></el-col>
					<el-col :span="6"><span><i class="icon-headphones">icon-headphones</i></span></el-col>
					<el-col :span="6"><span><i class="icon-heart">icon-heart</i></span></el-col>
					<el-col :span="6"><span><i class="icon-help-circle">icon-help-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-home">icon-home</i></span></el-col>
					<el-col :span="6"><span><i class="icon-inbox">icon-inbox</i></span></el-col>
					<el-col :span="6"><span><i class="icon-info">icon-info</i></span></el-col>
					<el-col :span="6"><span><i class="icon-instagram">icon-instagram</i></span></el-col>
					<el-col :span="6"><span><i class="icon-italic">icon-italic</i></span></el-col>
					<el-col :span="6"><span><i class="icon-layers">icon-layers</i></span></el-col>
					<el-col :span="6"><span><i class="icon-layout">icon-layout</i></span></el-col>
					<el-col :span="6"><span><i class="icon-life-buoy">icon-life-buoy</i></span></el-col>
					<el-col :span="6"><span><i class="icon-link-2">icon-link-2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-link">icon-link</i></span></el-col>
					<el-col :span="6"><span><i class="icon-list-alt">icon-list-alt</i></span></el-col>
					<el-col :span="6"><span><i class="icon-loader">icon-loader</i></span></el-col>
					<el-col :span="6"><span><i class="icon-lock">icon-lock</i></span></el-col>
					<el-col :span="6"><span><i class="icon-log-in">icon-log-in</i></span></el-col>
					<el-col :span="6"><span><i class="icon-log-out">icon-log-out</i></span></el-col>
					<el-col :span="6"><span><i class="icon-map-pin">icon-map-pin</i></span></el-col>
					<el-col :span="6"><span><i class="icon-map1">icon-map1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-maximize-2">icon-maximize-2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-maximize">icon-maximize</i></span></el-col>
					<el-col :span="6"><span><i class="icon-message-circle">icon-message-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-message-square">icon-message-square</i></span></el-col>
					<el-col :span="6"><span><i class="icon-mic-off">icon-mic-off</i></span></el-col>
					<el-col :span="6"><span><i class="icon-mic">icon-mic</i></span></el-col>
					<el-col :span="6"><span><i class="icon-minimize-2">icon-minimize-2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-minimize1">icon-minimize1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-minus-circle">icon-minus-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-minus-square">icon-minus-square</i></span></el-col>
					<el-col :span="6"><span><i class="icon-monitor1">icon-monitor1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-moon">icon-moon</i></span></el-col>
					<el-col :span="6"><span><i class="icon-more-horizontal">icon-more-horizontal</i></span></el-col>
					<el-col :span="6"><span><i class="icon-more-vertical">icon-more-vertical</i></span></el-col>
					<el-col :span="6"><span><i class="icon-move1">icon-move1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-music">icon-music</i></span></el-col>
					<el-col :span="6"><span><i class="icon-navigation-2">icon-navigation-2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-navigation">icon-navigation</i></span></el-col>
					<el-col :span="6"><span><i class="icon-octagon">icon-octagon</i></span></el-col>
					<el-col :span="6"><span><i class="icon-package">icon-package</i></span></el-col>
					<el-col :span="6"><span><i class="icon-paperclip">icon-paperclip</i></span></el-col>
					<el-col :span="6"><span><i class="icon-pencil">icon-pencil</i></span></el-col>
					<el-col :span="6"><span><i class="icon-percent">icon-percent</i></span></el-col>
					<el-col :span="6"><span><i class="icon-phone-call">icon-phone-call</i></span></el-col>
					<el-col :span="6"><span><i class="icon-phone-forwarded">icon-phone-forwarded</i></span></el-col>
					<el-col :span="6"><span><i class="icon-phone-incoming">icon-phone-incoming</i></span></el-col>
					<el-col :span="6"><span><i class="icon-phone-missed">icon-phone-missed</i></span></el-col>
					<el-col :span="6"><span><i class="icon-phone-off">icon-phone-off</i></span></el-col>
					<el-col :span="6"><span><i class="icon-phone-outgoing">icon-phone-outgoing</i></span></el-col>
					<el-col :span="6"><span><i class="icon-phone">icon-phone</i></span></el-col>
					<el-col :span="6"><span><i class="icon-picture">icon-picture</i></span></el-col>
					<el-col :span="6"><span><i class="icon-pie-chart">icon-pie-chart</i></span></el-col>
					<el-col :span="6"><span><i class="icon-plus-circle">icon-plus-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-plus-square">icon-plus-square</i></span></el-col>
					<el-col :span="6"><span><i class="icon-pocket">icon-pocket</i></span></el-col>
					<el-col :span="6"><span><i class="icon-power">icon-power</i></span></el-col>
					<el-col :span="6"><span><i class="icon-printer">icon-printer</i></span></el-col>
					<el-col :span="6"><span><i class="icon-radio">icon-radio</i></span></el-col>
					<el-col :span="6"><span><i class="icon-refresh-ccw">icon-refresh-ccw</i></span></el-col>
					<el-col :span="6"><span><i class="icon-refresh-cw">icon-refresh-cw</i></span></el-col>
					<el-col :span="6"><span><i class="icon-repeat">icon-repeat</i></span></el-col>
					<el-col :span="6"><span><i class="icon-rewind">icon-rewind</i></span></el-col>
					<el-col :span="6"><span><i class="icon-rotate-ccw">icon-rotate-ccw</i></span></el-col>
					<el-col :span="6"><span><i class="icon-rotate-cw">icon-rotate-cw</i></span></el-col>
					<el-col :span="6"><span><i class="icon-save">icon-save</i></span></el-col>
					<el-col :span="6"><span><i class="icon-scissors">icon-scissors</i></span></el-col>
					<el-col :span="6"><span><i class="icon-search1">icon-search1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-send">icon-send</i></span></el-col>
					<el-col :span="6"><span><i class="icon-server">icon-server</i></span></el-col>
					<el-col :span="6"><span><i class="icon-settings">icon-settings</i></span></el-col>
					<el-col :span="6"><span><i class="icon-share-2">icon-share-2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-shield-off">icon-shield-off</i></span></el-col>
					<el-col :span="6"><span><i class="icon-shield">icon-shield</i></span></el-col>
					<el-col :span="6"><span><i class="icon-shopping-bag">icon-shopping-bag</i></span></el-col>
					<el-col :span="6"><span><i class="icon-shopping-cart">icon-shopping-cart</i></span></el-col>
					<el-col :span="6"><span><i class="icon-shuffle">icon-shuffle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-sidebar">icon-sidebar</i></span></el-col>
					<el-col :span="6"><span><i class="icon-skip-back">icon-skip-back</i></span></el-col>
					<el-col :span="6"><span><i class="icon-skip-forward">icon-skip-forward</i></span></el-col>
					<el-col :span="6"><span><i class="icon-slack">icon-slack</i></span></el-col>
					<el-col :span="6"><span><i class="icon-slash">icon-slash</i></span></el-col>
					<el-col :span="6"><span><i class="icon-sliders">icon-sliders</i></span></el-col>
					<el-col :span="6"><span><i class="icon-smartphone">icon-smartphone</i></span></el-col>
					<el-col :span="6"><span><i class="icon-speaker">icon-speaker</i></span></el-col>
					<el-col :span="6"><span><i class="icon-star">icon-star</i></span></el-col>
					<el-col :span="6"><span><i class="icon-sun">icon-sun</i></span></el-col>
					<el-col :span="6"><span><i class="icon-sunrise">icon-sunrise</i></span></el-col>
					<el-col :span="6"><span><i class="icon-sunset">icon-sunset</i></span></el-col>
					<el-col :span="6"><span><i class="icon-tablet">icon-tablet</i></span></el-col>
					<el-col :span="6"><span><i class="icon-tag">icon-tag</i></span></el-col>
					<el-col :span="6"><span><i class="icon-target">icon-target</i></span></el-col>
					<el-col :span="6"><span><i class="icon-terminal">icon-terminal</i></span></el-col>
					<el-col :span="6"><span><i class="icon-thermometer">icon-thermometer</i></span></el-col>
					<el-col :span="6"><span><i class="icon-thumbs-down">icon-thumbs-down</i></span></el-col>
					<el-col :span="6"><span><i class="icon-thumbs-up">icon-thumbs-up</i></span></el-col>
					<el-col :span="6"><span><i class="icon-toggle-left">icon-toggle-left</i></span></el-col>
					<el-col :span="6"><span><i class="icon-toggle-right">icon-toggle-right</i></span></el-col>
					<el-col :span="6"><span><i class="icon-trash-2">icon-trash-2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-trash1">icon-trash1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-trending-down">icon-trending-down</i></span></el-col>
					<el-col :span="6"><span><i class="icon-trending-up">icon-trending-up</i></span></el-col>
					<el-col :span="6"><span><i class="icon-triangle">icon-triangle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-truck">icon-truck</i></span></el-col>
					<el-col :span="6"><span><i class="icon-tv">icon-tv</i></span></el-col>
					<el-col :span="6"><span><i class="icon-type">icon-type</i></span></el-col>
					<el-col :span="6"><span><i class="icon-umbrella">icon-umbrella</i></span></el-col>
					<el-col :span="6"><span><i class="icon-underline">icon-underline</i></span></el-col>
					<el-col :span="6"><span><i class="icon-unlock">icon-unlock</i></span></el-col>
					<el-col :span="6"><span><i class="icon-upload-cloud">icon-upload-cloud</i></span></el-col>
					<el-col :span="6"><span><i class="icon-video-off">icon-video-off</i></span></el-col>
					<el-col :span="6"><span><i class="icon-video">icon-video</i></span></el-col>
					<el-col :span="6"><span><i class="icon-voicemail">icon-voicemail</i></span></el-col>
					<el-col :span="6"><span><i class="icon-volume-1">icon-volume-1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-volume-2">icon-volume-2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-volume-x">icon-volume-x</i></span></el-col>
					<el-col :span="6"><span><i class="icon-volume">icon-volume</i></span></el-col>
					<el-col :span="6"><span><i class="icon-watch">icon-watch</i></span></el-col>
					<el-col :span="6"><span><i class="icon-wifi-off">icon-wifi-off</i></span></el-col>
					<el-col :span="6"><span><i class="icon-wifi">icon-wifi</i></span></el-col>
					<el-col :span="6"><span><i class="icon-wind">icon-wind</i></span></el-col>
					<el-col :span="6"><span><i class="icon-x-circle">icon-x-circle</i></span></el-col>
					<el-col :span="6"><span><i class="icon-x-square">icon-x-square</i></span></el-col>
					<el-col :span="6"><span><i class="icon-x">icon-x</i></span></el-col>
					<el-col :span="6"><span><i class="icon-youtube">icon-youtube</i></span></el-col>
					<el-col :span="6"><span><i class="icon-zap-off">icon-zap-off</i></span></el-col>
					<el-col :span="6"><span><i class="icon-zap">icon-zap</i></span></el-col>
					<el-col :span="6"><span><i class="icon-zoom-in">icon-zoom-in</i></span></el-col>
					<el-col :span="6"><span><i class="icon-zoom-out">icon-zoom-out</i></span></el-col>
				</el-row>
				
				<h3 class="pt30">其它</h3>
				<el-row :gutter="30">
					<el-col :span="6"><span><i class="icon-stopwatch">icon-stopwatch</i></span></el-col>
					<el-col :span="6"><span><i class="icon-star-full">icon-star-full</i></span></el-col>
					<el-col :span="6"><span><i class="icon-heart1">icon-heart1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-heart-broken">icon-heart-broken</i></span></el-col>
					<el-col :span="6"><span><i class="icon-man1">icon-man1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-woman1">icon-woman1</i></span></el-col>
					<el-col :span="6"><span><i class="icon-man-woman">icon-man-woman</i></span></el-col>
					<el-col :span="6"><span><i class="icon-happy">icon-happy</i></span></el-col>
					<el-col :span="6"><span><i class="icon-happy2">icon-happy2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-smile">icon-smile</i></span></el-col>
					<el-col :span="6"><span><i class="icon-smile2">icon-smile2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-tongue">icon-tongue</i></span></el-col>
					<el-col :span="6"><span><i class="icon-tongue2">icon-tongue2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-sad">icon-sad</i></span></el-col>
					<el-col :span="6"><span><i class="icon-sad2">icon-sad2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-wink">icon-wink</i></span></el-col>
					<el-col :span="6"><span><i class="icon-wink2">icon-wink2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-grin">icon-grin</i></span></el-col>
					<el-col :span="6"><span><i class="icon-grin2">icon-grin2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-cool">icon-cool</i></span></el-col>
					<el-col :span="6"><span><i class="icon-cool2">icon-cool2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-angry">icon-angry</i></span></el-col>
					<el-col :span="6"><span><i class="icon-angry2">icon-angry2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-evil">icon-evil</i></span></el-col>
					<el-col :span="6"><span><i class="icon-evil2">icon-evil2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-shocked">icon-shocked</i></span></el-col>
					<el-col :span="6"><span><i class="icon-shocked2">icon-shocked2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-baffled">icon-baffled</i></span></el-col>
					<el-col :span="6"><span><i class="icon-baffled2">icon-baffled2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-confused">icon-confused</i></span></el-col>
					<el-col :span="6"><span><i class="icon-confused2">icon-confused2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-neutral">icon-neutral</i></span></el-col>
					<el-col :span="6"><span><i class="icon-neutral2">icon-neutral2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-hipster">icon-hipster</i></span></el-col>
					<el-col :span="6"><span><i class="icon-hipster2">icon-hipster2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-wondering">icon-wondering</i></span></el-col>
					<el-col :span="6"><span><i class="icon-wondering2">icon-wondering2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-sleepy">icon-sleepy</i></span></el-col>
					<el-col :span="6"><span><i class="icon-sleepy2">icon-sleepy2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-frustrated">icon-frustrated</i></span></el-col>
					<el-col :span="6"><span><i class="icon-frustrated2">icon-frustrated2</i></span></el-col>
					<el-col :span="6"><span><i class="icon-crying">icon-crying</i></span></el-col>
					<el-col :span="6"><span><i class="icon-crying2">icon-crying2</i></span></el-col>
				</el-row>
			</div>
			</div>
		</div>
	</EasyScrollbar>
</div>
</template>
<script>

	export default {
		name: 'all_icons',
		components: {

		},
		data() {
			return {
				clientHeight:'',//获取浏览器高度
			}
		},
		mounted(){
			// 获取浏览器可视区域高度
			var _this = this;
			var clientHeight = $(window).height();    //document.body.clientWidth;
			_this.$refs.homePagess.style.height = clientHeight + 'px';
			window.onresize = function() {
				var clientHeight = $(window).height();
				_this.$refs.homePagess.style.height = clientHeight + 'px';
			};
		},
		methods: {
			
		},
	}
</script>

<style scoped>
i[class*=" icon-"]:before,i[class^="icon-"]:before {
	margin-right: 5px;
}
.el-col span {
	background:rgba(255,255,255,1);
	box-shadow:0px 5px 10px 0px rgba(223,229,234,1);
	display: block;
	border-radius:4px;
	padding:5px;
	cursor: pointer;
	margin-bottom: 5px;
}
.el-col span:hover,.el-col span.current {
	background:rgba(241,243,253,1); color:#576FAE;
}
.el-col span.current {color: #6585DF;}
</style>
<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
<!--				{{collapsed?'':sysName}}-->
				<img src="../assets/img/logo.png">
			</el-col>
			<el-col :span="1">
				<img style="position: relative;
						width: 40%;
						height: 40%;
						left: 20%;
						top: 6px;
					" src="../assets/img/list.png">
<!--				<div class="tools" @click.prevent="collapse">-->
<!--					<i class="fa fa-align-justify"></i>-->
<!--				</div>-->
			</el-col>
			<el-col :span="9">
				<span style="text-align: left; color: black; font-size: large; font-weight: bolder">青少年视力预警平台</span>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span style="color: black" class="el-dropdown-link userinfo-inner"><img src="../assets/user.png" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu   :index="index+''" v-if="!item.leaf">
							<template  slot="title"><i :class="item.iconCls"></i><span style="color: #6C73FA">{{item.name}}</span></template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
								<div class="tab-title-div"><span class="tab-title">{{child.name}}</span></div>
							</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'VUEADMIN',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	/*.el-menu-item.is-active {*/
	/*	!*.span-child {*!*/
	/*	!*	color: white;*!*/
	/*	!*	border-radius: 20rem;*!*/
	/*	!*	background: #5860FA;*!*/
	/*	!*	position: relative;*!*/
	/*	!*	width: 4rem;*!*/
	/*	!*	margin: 0;*!*/
	/*	!*	height: 2.5rem;*!*/
	/*	!*}*!*/
	/*}*/

	/*.el-submenu__title {*/
	/*	position: relative;*/
	/*	background: white;*/
	/*}*/
	.el-submenu .el-menu-item {
		height: 50px;
		line-height: 50px;
		padding: 0 45px;
		background: white;
		min-width: 200px;
	}

	.el-menu {
		border-radius: 2px;
		list-style: none;
		position: relative;
		margin: 0;
		padding-left: 0;
		background-color: white;
	}
	.el-menu-item.is-active {
		.tab-title-div {
			background: linear-gradient(315deg,rgba(88,96,250,1) 0%,rgba(121,128,250,1) 100%);
			border-radius: 2rem;
			position: relative;
			height: 70%;
			width: 80%;
			text-align: left;
			left: 0%;
			top: 15%;

			.tab-title {
				color: white;
				position: relative;
				width: 100%;
				top: -20%;
				left: 10%;
				text-align: center;
			}
		}
	}
	.el-menu-item {
		.tab-title-div {
			position: relative;
			height: 70%;
			width: 80%;
			text-align: left;
			left: 0%;
			top: 15%;
		}
		.tab-title {
			position: relative;
			width: 100%;
			top: -20%;
			left: 10%;
			text-align: center;
		}
	}

		.container {
			position: absolute;
			top: 0px;
			bottom: 0px;
			width: 100%;
			.header {
				height: 60px;
				line-height: 60px;
				background: white;
				color:#6E75FA;
				.userinfo {
					text-align: right;
					padding-right: 35px;
					float: right;
					.userinfo-inner {
						cursor: pointer;
						color:#fff;
						img {
							width: 40px;
							height: 40px;
							border-radius: 20px;
							margin: 10px 0px 10px 10px;
							float: right;
						}
					}
				}
				.logo {
					//width:230px;
					height:60px;
					font-size: 22px;
					padding-left:20px;
					padding-right:20px;
					border-color: rgba(238,241,146,0.3);
					border-right-width: 1px;
					border-right-style: solid;
					background: linear-gradient(315deg,rgba(88,96,250,1) 0%,rgba(121,128,250,1) 100%);
					img {
						position: relative;
						width: 50%;
						height: 43%;
						left: 20%;
						top: 10%;
					}
					.txt {
						color:#fff;
					}
				}
				.logo-width{
					width:230px;
				}
				.logo-collapse-width{
					width:60px
				}
				.tools{
					padding: 0px 23px;
					width:14px;
					height: 60px;
					line-height: 60px;
					cursor: pointer;
				}
			}
			.main {
				display: flex;
				// background: #324057;
				position: absolute;
				top: 60px;
				bottom: 0px;
				overflow: hidden;
				aside {
					flex:0 0 230px;
					width: 230px;
					// position: absolute;
					// top: 0px;
					// bottom: 0px;
					.el-menu{
						height: 100%;
					}
					.collapsed{
						width:60px;
						.item{
							position: relative;
						}
						.submenu{
							position:absolute;
							top:0px;
							left:60px;
							z-index:99999;
							height:auto;
							display:none;
						}

					}
				}
				.menu-collapsed{
					flex:0 0 60px;
					width: 60px;
				}
				.menu-expanded{
					flex:0 0 230px;
					width: 230px;
				}
				.content-container {
					// background: #f1f2f7;
					flex:1;
					// position: absolute;
					// right: 0px;
					// top: 0px;
					// bottom: 0px;
					// left: 230px;
					overflow-y: scroll;
					padding: 20px;
					background:  #FAFAFA;
					.breadcrumb-container {
						//margin-bottom: 15px;
						.title {
							width: 200px;
							float: left;
							color: #475669;
						}
						.breadcrumb-inner {
							float: right;
						}
					}
					.content-wrapper {
						background-color: #fff;
						box-sizing: border-box;
					}
				}
			}
		}
</style>

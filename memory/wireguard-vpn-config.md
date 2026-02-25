# WireGuard VPN 配置信息

_记录时间: 2026-02-25_
_服务器: 31.220.53.241_

---

## 🔐 服务器信息

| 项目 | 值 |
|------|-----|
| **服务器 IP** | 31.220.53.241 |
| **监听端口** | 51820 |
| **协议** | UDP |
| **VPN 网段** | 10.0.0.0/24 |
| **服务器公钥** | `rddgsdynTpuQIUeHTJLLbwMm/6QJ5dxoDdUMYSeJUTQ=` |

---

## 📱 Client 1 配置

### 配置文件 (wireguard-client1.conf)

```ini
[Interface]
PrivateKey = 0Kmfbi0NMx2E/jg81zNYOCL1ACdRn/qRPa8kKJclVmU=
Address = 10.0.0.2/24
DNS = 8.8.8.8, 8.8.4.4

[Peer]
PublicKey = rddgsdynTpuQIUeHTJLLbwMm/6QJ5dxoDdUMYSeJUTQ=
PresharedKey = lyg50adaIHdrexdQJlhgSrIl7NRa2lAUBmCon3ihs+A=
Endpoint = 31.220.53.241:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
```

### 使用方式

1. **手机扫码连接** (使用上面的 QR Code)
2. **配置文件导入**:
   - Android: 使用官方 WireGuard App，导入配置文件
   - iOS: 使用官方 WireGuard App，扫码或导入
   - Windows/Mac: 使用官方客户端，导入配置文件

---

## 📱 Client 2 配置

### 配置文件 (wireguard-client2.conf)

```ini
[Interface]
PrivateKey = eIq6PCloXpC31XBLAloyL8CJANP3ydLxyhylGUzVZ3Q=
Address = 10.0.0.3/24
DNS = 8.8.8.8, 8.8.4.4

[Peer]
PublicKey = rddgsdynTpuQIUeHTJLLbwMm/6QJ5dxoDdUMYSeJUTQ=
PresharedKey = l8712Wk0d2EHKtDniiU9qZEyL1UTeU6vplWkEZYBuWc=
Endpoint = 31.220.53.241:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
```

---

## 🔧 管理命令

### 服务器端操作

```bash
# 查看状态
wg show

# 重启 WireGuard
systemctl restart wg-quick@wg0

# 停止 WireGuard
systemctl stop wg-quick@wg0

# 查看日志
journalctl -u wg-quick@wg0 -f

# 配置文件位置
/etc/wireguard/wg0.conf
```

### 防火墙配置

```bash
# 放行 WireGuard 端口 (如果防火墙启用)
firewall-cmd --permanent --add-port=51820/udp
firewall-cmd --reload
```

---

## 📲 客户端下载

| 平台 | 下载地址 |
|------|---------|
| **Android** | [Google Play](https://play.google.com/store/apps/details?id=com.wireguard.android) |
| **iOS** | [App Store](https://apps.apple.com/us/app/wireguard/id1441195209) |
| **Windows** | [官方下载](https://www.wireguard.com/install/) |
| **Mac** | [App Store](https://apps.apple.com/us/app/wireguard/id1451685025) |
| **Linux** | `sudo apt install wireguard` 或 `sudo dnf install wireguard-tools` |

---

## ⚠️ 安全提醒

1. **PrivateKey 不要泄露** - 私钥等同于密码
2. **配置文件妥善保管** - 包含敏感信息
3. **定期更换密钥** - 建议每 3-6 个月更换
4. **监控连接日志** - 注意异常连接

---

## ✅ 功能验证

连接成功后，可以访问以下网站验证：
- https://www.ip138.com/ - 查看当前 IP 是否为服务器 IP
- https://dnsleaktest.com/ - 检查 DNS 是否泄露

---

**注意：此文件包含敏感密钥信息，请妥善保管！**

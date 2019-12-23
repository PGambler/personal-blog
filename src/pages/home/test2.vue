<template>
  <div v-highlight>
    <p>IOC作为spring的核心，有哪些相关的注解以及接口？</p>
<p>借助网上的一篇文章特此做一份自己记录</p>
<blockquote>
<p><a href="https://mrbird.cc/Spring-Bean-Regist.html" target="_blank">深入学习Spring组件注册</a></p>
</blockquote>
<ol>
<li>@Bean<br />
这是一个方法级别上的注解，主要用在@Configuration注解的类里，也可以在@component注解的类里</li>
</ol>
<pre><code class="lang-">@Configuration
public class AppConfig {
    @Bean
    public Demo demo() {
        return new Demo();
    }
}
</code></pre>
<ol start="2">
<li>@ComponentScan<br />
这是一个类级别上的注解，配合@Configuration注解一起使用。从定义扫描的路径（未指定即为当前注解类所在包）中找出标注@Controller、@Service、@Repository、@Component的类装配到spring容器中</li>
</ol>
<pre><code class="lang-">@Configuration
@ComponentScan(&quot;com.demo&quot;)
public class AppConfig {
}
</code></pre>
<p>excludeFilters来排除一些组件的扫描：</p>
<pre><code class="lang-">@Configuration
@ComponentScan(value=&quot;com.demo&quot;, excludeFilters = {
  @Filter(type = FilterType.ANNOTATION,classes = {Controller.class, Repository.class}),
   @Filter(type = FilterType.ASSIGNABLE_TYPE,classes = {Demo1.class, Demo2.class})
})
public class AppConfig {
}
</code></pre>
<p>includeFilters的作用和excludeFilters相反，其指定的是哪些组件需要被扫描：</p>
<pre><code class="lang-">@Configuration
@ComponentScan(value=&quot;com.demo&quot;, includeFilters = {
  @Filter(type = FilterType.ANNOTATION, classes = Service.class)},
  useDefaultFilters = false)
})
public class AppConfig {
}
</code></pre>
<ol start="3">
<li>@Scope<br />
组件的作用域，类与方法级别都可使用该注解。默认情况下IOC容器里面的组件均是单例（容器创建过程注入），可通过@Scope注解进行组件作用域配置：<br />
1） singleton：单实例（默认）,在Spring IOC容器启动的时候会调用方法创建对象然后纳入到IOC容器中，以后每次获取都是直接从IOC容器中获取（map.get()）；<br />
2）prototype：多实例，IOC容器启动的时候并不会去创建对象，而是在每次获取的时候才会去调用方法创建对象；<br />
3）request：一个请求对应一个实例；<br />
4）session：同一个会话对应一个实例；</li>
</ol>
<pre><code class="lang-">@Configuration
public class WebConfig {
    @Bean
    @Scope(&quot;prototype&quot;)
    public User user() {
        return new User(&quot;mrbird&quot;, 18);
    }
}
</code></pre>
<ol start="4">
<li>@Lazy<br />
懒加载是针对单例模式而言的，正如前面所说，IOC容器中的u组件默认是单例的，容器启动的时候会调用方法创建对象然后注入到IOC容器中。而当使用懒加载模式时，对象将不在容器启动过程中马上创建（除非使用），而是等到对象首次被调用时进行实例化注入容器并返回给调用方。</li>
</ol>
<pre><code class="lang-">@Configuration
public class WebConfig {
    @Bean
    @Lazy
    public User user() {
        return new User(&quot;mrbird&quot;, 18);
    }
}
</code></pre>
<ol start="5">
<li>Conditional<br />
条件注册注解，类与方法级别的注解，该注解可以指定组件注册的条件，当组件满足特定的条件后才注入IOC容器。该注解接受一个实现Condition接口的类型：</li>
</ol>
<pre><code class="lang-">class MyCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        String osName = context.getEnvironment().getProperty(&quot;os.name&quot;);
        return osName != null &amp;&amp; osName.contains(&quot;Windows&quot;);
    }
}

@Configuration
class Demo {
    @Bean
    @Conditional(MyCondition.class)
    public User user() {
        return new User(&quot;mrbird&quot;, 18);
    }
}
</code></pre>
<ol start="6">
<li>Profile<br />
@Profile可以根据不同的环境变量来注册不同的组件</li>
</ol>
<blockquote>
<p><a href="https://cloud.tencent.com/developer/article/1362768" target="_blank">Spring 中的@Profile 注解的作用是什么？</a></p>
</blockquote>
<pre><code class="lang-">@Configuration
class AppConfig {
    @Bean(&quot;demo&quot;)
    @Profile(&quot;java7&quot;)
    public Demo demo1() {
        return new Demo(&quot;mrbird&quot;, &quot;java7&quot;);
    }
    @Bean(&quot;demo&quot;)
    @Profile(&quot;java8&quot;)
    public Demo demo2() {
        return new Demo(&quot;mrbird&quot;, &quot;java8&quot;);
    }
}
</code></pre>
<ol start="7">
<li>@Import<br />
到目前为止，我们可以使用包扫描和@Bean来实现组件注册。除此之外，我们还可以使用@Import来快速地往IOC容器中添加组件。</li>
</ol>
<pre><code class="lang-">class Hello {
}
@Configuration
@Import({Hello.class})
public class AppConfig {
}
</code></pre>
<ol start="8">
<li>ImportSelector<br />
通过@Import我们已经实现了组件的导入，如果需要一次性导入较多组件，我们可以使用ImportSelector来实现。</li>
</ol>
<pre><code class="lang-">class MyImportSelector implements ImportSelector {
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        return new String[]{
                &quot;cc.mrbird.demo.domain.Apple&quot;,
                &quot;cc.mrbird.demo.domain.Banana&quot;,
                &quot;cc.mrbird.demo.domain.Watermelon&quot;
        };
    }
}

@Import({MyImportSelector.class})
public class WebConfig {
    ...
}
</code></pre>
<ol start="9">
<li>ImportBeanDefinitionRegistrar<br />
除了上面两种往IOC容器导入组件的方法外，我们还可以使用ImportBeanDefinitionRegistrar来手动往IOC容器导入组件。</li>
</ol>
<pre><code class="lang-">class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        final String beanName = &quot;strawberry&quot;;
        boolean contain = registry.containsBeanDefinition(beanName);
        if (!contain) {
            RootBeanDefinition rootBeanDefinition = new RootBeanDefinition(Strawberry.class);
            registry.registerBeanDefinition(beanName, rootBeanDefinition);
        }
    }
}

@Configuration
@Import({MyImportBeanDefinitionRegistrar.class})
public class WebConfig {
    ...
}
</code></pre>
<ol start="10">
<li>FactoryBean<br />
Spring还提供了一个FactoryBean接口，我们可以通过实现该接口来注册组件，该接口包含了两个抽象方法和一个默认方法：</li>
</ol>
<pre><code class="lang-">class CherryFactoryBean implements FactoryBean&lt;Cherry&gt; {
    @Override
    public Cherry getObject() {
        return new Cherry();
    }

    @Override
    public Class&lt;?&gt; getObjectType() {
        return Cherry.class;
    }

    @Override
    public boolean isSingleton() {
        return false;
    }
}

@Bean
public CherryFactoryBean cherryFactoryBean() {
    return new CherryFactoryBean();
}
</code></pre>
<p>以上有些是个人观点，如发现有误还望指出</p>
<p>（完）</p>

  </div>
</template>
<script>
export default { name: "test2", title: "学习Spring组件" };
</script>